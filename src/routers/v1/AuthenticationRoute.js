const { Router } = require("express");
const { actionRegister, actionLogin } = require("../../controllers/v1/AuthenticationController");

const router = Router();

router.post("/register", actionRegister);
router.post("/login", actionLogin);

module.exports = router;