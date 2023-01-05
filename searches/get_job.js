const { parser } = require("../utils/xmlParser");

const perform = async (z, bundle) => {
    const options = {
        url: `https://api.xero.com/workflowmax/3.0/job.api/get/${bundle.inputData.job_number}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${bundle.authData.access_token}`,
            "Xero-tenant-id": `${bundle.inputData.tenant}`,
        },
    };

    return z.request(options).then((response) => {
        response.throwForStatus();
        const parsedResponse = parser.parse(response.content);
        const results = [parsedResponse.Response.Job];
        // You can do any parsing you need for results here before returning them

        return results;
    });
};

module.exports = {
    key: "get_job",
    noun: "Job",
    display: {
        label: "Get Job",
        description: "Gets the details of a specific job from XPM",
        hidden: false,
        important: true,
    },
    operation: {
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
        ],
        perform: perform,
    },
};
