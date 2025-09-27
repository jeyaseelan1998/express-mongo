const jwt = require("jsonwebtoken");
const { cookieName } = require("../helper/constants");
const Error = require("../models/Error");
const User = require("../models/User");
const { SECRET_KEY } = require("../helper/envConfig");
const { FailedResponse } = require("../helper/Response");

async function authenticate(req, res, next) {
    try {
        const token = req.cookies[cookieName];
        jwt.verify(token, SECRET_KEY, (error, payload) => {
            if (!error) {
                req.params.email = payload.email;
                next();
            } else {
                res
                    .status(401)
                    .send(new FailedResponse({ status: 401, message: "Invalid Access Token" }))
            }
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send(new FailedResponse({ status: 500, message: error.message }))
    }
}

module.exports = {
    authenticate
}