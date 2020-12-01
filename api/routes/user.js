let { Router } = require("express");
const route = Router();

let { login, token } = require("../../controllers/user");

module.exports = (app) => {
    app.use("/user", route);

    route.post("/login", [login]);
    route.get("/token", [token]);
};
