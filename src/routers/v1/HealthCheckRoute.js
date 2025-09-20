const { Router } = require("express");
const { actionHealthCheck } = require("../../controllers/v1/HealthCheckController");

const router = Router();

router.get("/", actionHealthCheck)

module.exports = router;