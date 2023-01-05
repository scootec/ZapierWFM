// create a particular Job Note by name
const { parser, builder } = require("../utils/xmlParser");
const perform = async (z, bundle) => {
    const body = builder.build({
        Note: {
            Job: bundle.inputData.job_number,
            Title: bundle.inputData.note_title,
            Text: bundle.inputData.note_text,
        },
    });
    const options = {
        url: `https://api.xero.com/workflowmax/3.0/job.api/note`,
        method: "POST",
        body: body,
        headers: {
            Authorization: `Bearer ${bundle.authData.access_token}`,
            "Xero-tenant-id": `${bundle.inputData.tenant}`,
        },
    };

    return z.request(options).then((response) => {
        response.throwForStatus();
        const parsedResponse = parser.parse(response.content);
        const results = parsedResponse;
        // You can do any parsing you need for results here before returning them

        return results;
    });
};

module.exports = {
    // see here for a full list of available properties:
    // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#createschema
    key: "job_note",
    noun: "Job Note",

    display: {
        label: "Create Job Note",
        description: "Creates a new Job Note.",
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
                key: "note_title",
                label: "Note Title",
                type: "string",
                required: true,
                list: false,
                altersDynamicFields: false,
            },
            {
                key: "note_text",
                label: "Note Text",
                type: "text",
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
