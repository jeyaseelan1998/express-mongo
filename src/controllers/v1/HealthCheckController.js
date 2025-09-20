function actionHealthCheck(req, res) {
    res
    .status(200)
    .send({ status: "OK" });
}

module.exports = {
    actionHealthCheck
}