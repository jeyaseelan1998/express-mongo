const { cookieName } = require("../../helper/constants");

function actionHealthCheck(req, res) {
    const token = req.cookies[cookieName];

    res
        .status(200)
        .cookie(
            cookieName,
            "testing1234",
            {
                secure: true,
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            }
        )
        .send({ status: "OK", token });
}

module.exports = {
    actionHealthCheck
}