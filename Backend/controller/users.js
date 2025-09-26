const express = require("express");
const router = express.Router();

const Register = require("../abl/Users/register");
const Login=require("../abl/Users/login")
const ResetPassword=require("../abl/Users/forgotPassword")

router.post("/register", Register);
router.post("/login",Login)
router.post("/reset-password",ResetPassword)

module.exports = router;