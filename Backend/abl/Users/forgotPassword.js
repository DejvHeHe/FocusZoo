const Ajv = require("ajv");
const ajv = new Ajv();

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
        const email=res.body;
        const valid= ajv.validate(schema,email)
        if(!valid)
        {
            return res.status(400).json({
                code: "dtoInIsNotValid",
                category: "dtoIn is not valid",
                validationError: ajv.errors,
            });
        }
        const exist=usersDao.findByEmail(email.email)
        if(!exist)
        {
            return res.status(400).json({
                code:"emailIsNotValid",
                message:"User with this email doesnt exist"
            })
        }
        

    }
    catch(e)
    {
        
        res.status(500).json({ error: e.message || "Nastala chyba." });
    }
    


}
module.exports=ForgotPassword;
