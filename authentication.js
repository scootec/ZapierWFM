module.exports = {
  type: 'oauth2',
  test: {
    headers: { Authorization: 'Bearer {{bundle.authData.access_token}}' },
    url: 'https://api.xero.com/connections',
  },
  oauth2Config: {
    authorizeUrl: {
      url: 'https://login.xero.com/identity/connect/authorize',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
        state: '{{bundle.inputData.state}}',
      },
    },
    getAccessToken: {
      body: {
        code: '{{bundle.inputData.code}}',
        client_id: '{{process.env.CLIENT_ID}}',
        client_secret: '{{process.env.CLIENT_SECRET}}',
        grant_type: 'authorization_code',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      method: 'POST',
      url: 'https://identity.xero.com/connect/token',
    },
    refreshAccessToken: {
      body: {
        refresh_token: '{{bundle.authData.refresh_token}}',
        grant_type: 'refresh_token',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      method: 'POST',
      url: 'https://identity.xero.com/connect/token',
    },
    scope: 'offline_access workflowmax.job',
    autoRefresh: true,
  },
  connectionLabel: '',
};
