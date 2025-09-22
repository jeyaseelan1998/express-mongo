const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Role = require("../../models/Role");
const { SECRET_KEY } = require("../../helper/envConfig");
const { errorLogger } = require("./ErrorController")

async function actionRegister(req, res) {
    try {
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser !== null) {
            res
                .status(400)
                .send({ message: "User already exists!" });
        } else {
            if (!role) {
                res
                    .status(400)
                    .send({ message: "Role field is rrquired!" });
            } else {
                const roleDocument = await Role.findOne({
                    role,
                });
                const hash = await bcrypt.hash(password, 10);
                const userData = await User.create({
                    username,
                    password: hash,
                    role: roleDocument?.id
                });
                res
                    .status(200)
                    .send({ userData });
            }
        }
    } catch (error) {
        console.log(error.stack);

        res
            .status(500)
            .send({ message: error.message, stack: error.stack });
    }
}

async function actionLogin(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res
                .status(400)
                .send({ message: "Username / Password is required." });
        } else {
            const { password: hash } = await User.findOne({ username });
            const isPasswordCorrect = await bcrypt.compare(password, hash);
            if (isPasswordCorrect === false) {
                res
                    .status(401)
                    .send({ message: "Username / Password is incorrect." });
            } else {
                const jwtToken = jwt.sign({ username }, SECRET_KEY);
                res
                    .status(200)
                    .send({ jwtToken });
            }
        }
    } catch (error) {
        console.log(error.stack);
        await errorLogger({ message: error.message, stack: error.stack, repository: "Website" });
        res
            .status(500)
            .send({ message: error.message, stack: error.stack });
    }
}

module.exports = {
    actionRegister,
    actionLogin
}