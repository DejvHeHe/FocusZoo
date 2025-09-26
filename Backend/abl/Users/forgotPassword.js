const Ajv = require("ajv");
const ajv = new Ajv();
const crypto = require("crypto");
const sendEmail = require ("./sendEmail");

const usersDao = require("../../dao/users");

const schema = {
  type: "object",
  properties: {
    email: { type: "string" },     
  },
  required: ["email"],
  additionalProperties: false,
};
async function ForgotPassword(req,res)
{
    try{
        const email=req.body;
        const valid= ajv.validate(schema,email)
        if(!valid)
        {
            return res.status(400).json({
                code: "dtoInIsNotValid",
                category: "dtoIn is not valid",
                validationError: ajv.errors,
            });
        }
        const user=usersDao.findByEmail(email.email)
        if(!user)
        {
            return res.status(400).json({
                code:"emailIsNotValid",
                message:"User with this email doesnt exist"
            })
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const expiry = Date.now() + 15 * 60 * 1000;
        await usersDao.saveResetToken(user._id, resetToken, expiry);

        const resetLink = `http://localhost:5000/reset-password?token=${resetToken}`;
        await sendEmail(user.email, "Password Reset", `Click here: ${resetLink}`);

        res.json({ message: "Password reset email sent." });


    }
    catch(e)
    {
        
        res.status(500).json({ error: e.message || "Nastala chyba." });
    }
    


}
module.exports=ForgotPassword;
