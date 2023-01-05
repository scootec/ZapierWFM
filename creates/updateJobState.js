// create a particular job by name
const { parser } = require("../utils/xmlParser");
const perform = async (z, bundle) => {
    const options = {
        url: `https://api.xero.com/workflowmax/3.0/job.api/state`,
        method: "PUT",
        body: `<Job>
        <ID>${bundle.inputData.job_number}</ID>
        <State>${bundle.inputData.job_state}</State>
      </Job>`,
        headers: {
            Authorization: `Bearer ${bundle.authData.access_token}`,
            "Xero-tenant-id": `${bundle.inputData.tenant}`,
        },
    };

    return z.request(options).then((response) => {
        response.throwForStatus();
        return {};
    });
};

module.exports = {
    // see here for a full list of available properties:
    // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#createschema
    key: "job",
    noun: "Job",

    display: {
        label: "Update Job State",
        description: "Updates a jobs state in XPM.",
    },

    operation: {
        perform,

        // `inputFields` defines the fields a user could provide
        // Zapier will pass them in as `bundle.inputData` later. They're optional.
        // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
        inputFields: [
            {
                key: "tenant",
                label: "WorkflowMax Tenant",
                type: "string",
                helpText: "Which WorkflowMax tenant are we connecting too?",
                dynamic: "get_tenants.tenantId.tenantName",
                required: true,
                list: false,
                altersDynamicFields: false,
            },
            {
                key: "job_number",
                label: "Job Number",
                type: "string",
                required: true,
                list: false,
                altersDynamicFields: false,
            },
            {
                key: "job_state",
                label: "Job State",
                type: "string",
                required: true,
                list: false,
                altersDynamicFields: false,
            },
        ],

        // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
        // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
        // returned records, and have obvious placeholder values that we can show to any user.
        sample: {
            id: 1,
            name: "Test",
        },

        // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
        // For a more complete example of using dynamic fields see
        // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
        // Alternatively, a static field definition can be provided, to specify labels for the fields
        outputFields: [
            // these are placeholders to match the example `perform` above
            // {key: 'id', label: 'Person ID'},
            // {key: 'name', label: 'Person Name'}
        ],
    },
};
