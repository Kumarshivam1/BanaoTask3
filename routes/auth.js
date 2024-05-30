const express = require("express");
const router = express.Router();

const {registerController,loginController,forgotController} = require("../controller/authController.js");
router.post("/register",registerController);
router.post("/login",loginController);
router.put("/forgot",forgotController);

module.exports = router;