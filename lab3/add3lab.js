var request = require('request');
require('dotenv-expand').expand(require('dotenv').config());

const getTokenRequest = {
    method: 'POST',
    url: `https://${process.env.MY_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        client_id: process.env.MY_CLIENT_ID,
        client_secret: process.env.MY_CLIENT_SECRET,
        audience: process.env.MY_AUDIENCE,
        grant_type: 'client_credentials',
    },
};

request(getTokenRequest, (error, response, body) => {
    if (error) {
        console.log('(1) error:', error);
        return;
    }
    const info = JSON.parse(body);
    console.log('(1):', info);
    updatePassword(info.access_token);
});

function updatePassword(accessToken) {
    const updatePasswordOptions = {
        method: 'Patch',
        url: `https://${process.env.MY_DOMAIN}/api/v2/users/${process.env.USER_ID}`,
        headers: {
            'content-type': 'x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
        },
        form: {
            password: 'Qwerty123',
        },
    };

    request(updatePasswordOptions, (error, response, body) => {
        if (error) {
            console.log('(2) error:', error);
            return;
        }
        console.log('(2):', JSON.parse(body));
        console.log('Password updated successfully');
    });
}
