const { Router } = require("express");
const { actionRegister } = require("../../controllers/v1/AuthenticationController");

const router = Router();

router.post("/register", actionRegister);

module.exports = router;