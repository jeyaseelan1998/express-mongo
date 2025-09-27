const { Router } = require("express");
const { actionHealthCheck, actionHealthCheckSetToken } = require("../../controllers/HealthCheckController");
const { authenticate } = require("../../middlewares/Authenticate");

const router = Router();

router.get("/", authenticate, actionHealthCheck);
router.get("/set-token", actionHealthCheckSetToken);

module.exports = router;