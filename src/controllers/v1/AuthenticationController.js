const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Role = require("../../models/Role");
const { SECRET_KEY } = require("../../helper/envConfig");
const { errorLogger } = require("./ErrorController")
const { FailedResponse, SuccessResponse } = require("../../helper/Response");

async function actionRegister(req, res) {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser !== null) {
            res
                .status(400)
                .send(new FailedResponse({ status: 400, message: "User already exists!" }));
        } else {
            if (!role) {
                res
                    .status(400)
                    .send(new FailedResponse({ status: 400, message: "Role field is required!" }));
            } else {
                const roleDocument = await Role.findOne({
                    role,
                });
                const hash = await bcrypt.hash(password, 10);
                const userData = await User.create({
                    email,
                    password: hash,
                    role: roleDocument?.id
                });
                res
                    .status(200)
                    .send(new SuccessResponse({ status: 200, data: userData }));
            }
        }
    } catch (error) {
        res
            .status(500)
            .send(new FailedResponse({ status: 500, message: error.message, stack: error.stack }));
    }
}

async function actionLogin(req, res) {
    try {
        const a = h;    
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .send(new FailedResponse({ status: 400, message: "Email / Password is required." }));
        } else {
            const { password: hash } = await User.findOne({ email });
            const isPasswordCorrect = await bcrypt.compare(password, hash);
            if (isPasswordCorrect === false) {
                res
                    .status(401)
                    .send(new FailedResponse({ status: 401, message: "Email / Password is incorrect." }));
            } else {
                const jwtToken = jwt.sign({ email }, SECRET_KEY);
                res
                    .status(200)
                    .send({ jwtToken });
            }
        }
    } catch (error) {
        await errorLogger({ message: error.message, stack: error.stack, repository: "website", url: req.originalUrl });
        res
            .status(500)
            .send(new FailedResponse({ status: 500, message: error.message, stack: error.stack, url: req.originalUrl }));
    }
}

module.exports = {
    actionRegister,
    actionLogin
}