const Ajv = require("ajv");
const ajv = new Ajv();

const usersDao = require("../../dao/users");

const schema = {
  type: "object",
  properties: {
    email: { type: "string" },
    newpassword:{type:"string"},
    resetCode:{type:"string"},    
  },
  required: ["email","newpassword","resetCode"],
  additionalProperties: false,
};
async function ResetPassword(req,res)
{
    try{
        const user=req.body
        const valid=ajv.validate(schema,user)
        if(!valid)
        {
            return res.status(400).json({
                
                code: "dtoInIsNotValid",
                category: "dtoIn is not valid",
                validationError: ajv.errors,

            });
        }
        const userFound=await usersDao.findByEmail(user.email)
        if(userFound.error)
        {
            return res.status(400).json({
                code:userFound.code,
                message:userFound.error
            });
        }
       if (userFound.resetCode !== user.resetCode) {
            return res.status(400).json({
                code:"codeIsntValid",
                message:"Your code is not valid"
            })
        }
        if(Date.now() > userFound.resetCodeExpiry)
        {
            return res.status(400).json({
                code:"codeIsExpired",
                message:"Your code is expired"
            })

        }
        const changePassword=await usersDao.changePassword(userFound._id,user.newpassword)
        await usersDao.saveResetToken(userFound._id, null, null);

        res.status(200).json({ message: "Password changed successfully" });

       


    }
    catch(e)
    {
        
        res.status(500).json({ error: e.message || "Nastala chyba." });
    }
}


module.exports=ResetPassword;