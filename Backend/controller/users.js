const express = require("express");
const router = express.Router();

const Register = require("../abl/Users/register");
const Login=require("../abl/Users/login")
const GenerateResetPasswordCode=require("../abl/Users/generateResetPasswordCode")
const ResetPassword=require("../abl/Users/resetPassword")

router.post("/register", Register);
router.post("/login",Login)
router.post("/generate-password-reset-code",GenerateResetPasswordCode)
router.post("/reset-password",ResetPassword)

module.exports = router;