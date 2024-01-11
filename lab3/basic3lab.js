const request = require('request');
require('dotenv-expand').expand(require('dotenv').config());

const getTokensRequest = {
    method: 'POST',
    url: `https://${process.env.MY_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        audience: process.env.MY_AUDIENCE,
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        client_id: process.env.MY_CLIENT_ID,
        client_secret: process.env.MY_CLIENT_SECRET,
        username: 'skava@gmail.com',
        password: 'cdjskhfeoiwndxgjherilse-73264734',
        scope: 'offline_access',
        realm: 'Username-Password-Authentication',
    },
};

request(getTokensRequest, (error, response, body) => {
    if (error) {
        console.log('(1) error:', error);
        return;
    }
    const info = JSON.parse(body);
    console.log('(1):', info);
    refreshToken(info.access_token, info.refresh_token);
});

function refreshToken(accessToken, refreshToken) {
    const refreshTokenRequest = {
        method: 'POST',
        url: `https://${process.env.MY_DOMAIN}/oauth/token`,
        headers: {
            'content-type': 'x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
        },
        form: {
            grant_type: 'refresh_token',
            audience: process.env.MY_AUDIENCE,
            client_id: process.env.MY_CLIENT_ID,
            client_secret: process.env.MY_CLIENT_SECRET,
            refresh_token: refreshToken,
        },
    };

    request(refreshTokenRequest, (error, response, body) => {
        if (error) {
            console.log('(2) error:', error);
            return;
        }
        const info = JSON.parse(body);
        console.log('(2):', info);
    });
}
