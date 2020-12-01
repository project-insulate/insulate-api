const axios = require('axios')
const qs = require('qs')

exports.getTokens = async authCode => {
    try {
        let data = qs.stringify({
            'code': authCode,
            'grant_type': 'authorization_code',
            'redirect_uri': process.env.COIL_REDIRECT_URI
        });

        let config = {
            method: 'post',
            url: 'https://coil.com/oauth/token',
            headers: {
                'Authorization': `Basic ${process.env.COIL_SECRET_BASE64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        };

        const resp = await axios(config);
        return resp.data;

    } catch (error) {
        console.error(error);
    }
}

exports.getUserUID = async (accessToken) => {
    try {
        var config = {
            method: 'get',
            url: 'https://api.coil.com/user/info',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const resp = await axios(config);
        return resp.data;
    }
    catch (error) {
        console.error(error);
    }
}

exports.getAccessToken = async (refreshToken) => {
    try {
        let data = qs.stringify({
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
        });

        let config = {
            method: 'post',
            url: 'https://coil.com/oauth/token',
            headers: {
                'Authorization': `Basic ${process.env.COIL_SECRET_BASE64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        };
        const resp = await axios(config);
        return resp.data;
    }
    catch (error) {
        console.error(error);
    }
}

exports.getBTPToken = async (accessToken) => {
    try {
        var config = {
            method: 'post',
            url: 'https://api.coil.com/user/btp',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const resp = await axios(config);
        return resp.data;
    }
    catch (error) {
        console.error(error);
    }
}