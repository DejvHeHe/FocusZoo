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
async function Register(req,res)
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
        const re = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\sA-Za-z0-9])(?!.*\s).*$/;

        if(!re.test(user.password))
        {
            return res.status(400).json({
                code:"weakPassword",
                message:"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character. Spaces are not allowed."
            });

        }
        const registerUser=await usersDao.register(user)
        res.json(registerUser)



    }
    catch(e)
    {
        
        res.status(500).json({ error: e.message || "Nastala chyba." });
    }
}


module.exports=Register;