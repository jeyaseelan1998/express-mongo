const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Role = require("../../models/Role");

async function actionRegister(req, res) {
    try {
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser !== null) {
            res
                .status(400)
                .send({ message: "User already exists!", existingUser });
        } else {
            const roleDocument = await Role.findOne({
                role,
            });
            const hash = await bcrypt.hash(password, 10);
            const userData = await User.create({
                username,
                password: hash,
                role: roleDocument.id
            });
            res
                .status(200)
                .send({ userData });
        }
    } catch (error) {
        console.log(error.stack);
        
        res
            .status(500)
            .send({ message: error.message, stack: error.stack });
    }
}

module.exports = {
    actionRegister
}