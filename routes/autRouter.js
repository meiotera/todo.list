const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.get("/", AuthController.auth);
router.post("/accountPost", AuthController.createAccountPost)

router.post("/loginPost", AuthController.loginPost)

module.exports = router;
