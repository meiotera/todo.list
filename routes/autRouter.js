const express = require("express");
const router = express.Router();

router.get("/authenticator", AuthController.auth);

module.exports = router;
