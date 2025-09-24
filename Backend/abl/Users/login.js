const Ajv = require("ajv");
const ajv = new Ajv();

const usersDao = require("../../dao/users");

const schema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password:{type:"string"},       
  },
  required: ["email","password"],
  additionalProperties: false,
};
async function Login(req,res)
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
        const token=await usersDao.login(user,userFound)

        if(token.error)
        {
            return res.status(400).json({
                code:token.code,
                message:token.error
            });
        }
        res.status(200).json({ token }); // ✅ Proper JSON format


    }
    catch(e)
    {
        
        res.status(500).json({ error: e.message || "Nastala chyba." });
    }
}


module.exports=Login;