const { cookieName } = require("../helper/constants");

function actionHealthCheck(req, res) {
    const token = req.cookies[cookieName];
    const email = req.params.email;

    res
        .status(200)
        .send({ status: "OK", token, email });
}

function actionHealthCheckSetToken(req, res) {
    res
        .status(200)
        .cookie(
            cookieName,
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpleWFzZWVsYW5AZ21haWwuY29tIiwiaWF0IjoxNzU4OTQ2NzM3fQ.6NlJNrBz5B1Zw6b91YnmDVO8O9yN3pMqH0S9tbjoKnw",
            {
                secure: true,
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            }
        )
        .send({ status: "Token Set" });
}

module.exports = {
    actionHealthCheck,
    actionHealthCheckSetToken
}