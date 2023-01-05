module.exports = {
  operation: {
    perform: {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.access_token}}',
      },
      url: 'https://api.xero.com/connections',
    },
    sample: {
      id: '9e8aa6a7-e4c8-49d7-85f9-8760cbaa970d',
      authEventId: 'f731077c-d67c-4be4-ade6-11803d952b47',
      tenantId: '6183f627-fcfb-4785-8ba1-b9c65d9a9b24',
      tenantType: 'WORKFLOWMAX',
      tenantName: 'illumin8 API Test',
      createdDateUtc: '2023-01-05T00:11:23.5753310',
      updatedDateUtc: '2023-01-05T00:11:23.5772540',
    },
    outputFields: [
      { key: 'id' },
      { key: 'tenantId' },
      { key: 'tenantType' },
      { key: 'tenantName' },
    ],
  },
  key: 'get_tenants',
  noun: 'Tenant',
  display: {
    label: 'Get Workflowmax Tenants',
    description: 'Get Workflowmax Tenants to retrieve tenant id',
    hidden: true,
    important: false,
  },
};
