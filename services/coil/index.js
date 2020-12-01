const service = require("./coil")

module.exports = {
    getTokens: service.getTokens,
    getUserUID: service.getUserUID,
    getAccessToken: service.getAccessToken,
    getBTPToken: service.getBTPToken,
}