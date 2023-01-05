const authentication = require("./authentication");
const getTenantsTrigger = require("./triggers/get_tenants.js");
const getJobSearch = require("./searches/get_job.js");

const updateJobState = require("./creates/updateJobState");

const createJobNote = require("./creates/job_note");

module.exports = {
    version: require("./package.json").version,
    platformVersion: require("zapier-platform-core").version,
    authentication: authentication,
    searches: { [getJobSearch.key]: getJobSearch },
    triggers: { [getTenantsTrigger.key]: getTenantsTrigger },

    creates: {
        [updateJobState.key]: updateJobState,
        [createJobNote.key]: createJobNote,
    },
};
