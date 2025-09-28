require('dotenv').config(); // Load env vars
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');



const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Ensure DB connection
async function ensureConnection() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

// Ensure unique index on email
async function ensureEmailUniqueIndex() {
  await client
    .db("FocusZoo")
    .collection("users")
    .createIndex({ email: 1 }, { unique: true });
}

// Register new user
async function register(user) {
  try {
    await ensureConnection();
    await ensureEmailUniqueIndex(); // Runs once, then is ignored

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const userDoc = {
      email: user.email,
      passwordHash: hashedPassword,
      createdAt: new Date(),
    
    };

    const result = await client
      .db("FocusZoo")
      .collection("users")
      .insertOne(userDoc);

    return { success: true, userId: result.insertedId };
  } catch (err) {
    if (err.code === 11000) {
      return { success: false, error: "Email already registered." ,code: "EmailAlreadyRegistered"};
    }
    console.error("Registration error:", err);
    return { success: false, error: "Something went wrong." };
  }
}
async function login(user,userFound) {
  try{
    await ensureConnection()
    const jwt = require('jsonwebtoken');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
    const isMatch=await bcrypt.compare(user.password, userFound.passwordHash);
    if(!isMatch)
    {
      return { success: false, error: "You have wrong password",code: "PasswordNotMatch" };
    }
    
    const token = jwt.sign(
      { userId: userFound._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return token

  }
  catch(err)
  {
    console.error("Login error",err)
    return { success: false, error: "Something went wrong." };
  }
  
}
async function findByEmail(email)//find by email
{
  await ensureConnection()
  const user=await client
  .db("FocusZoo")
  .collection("users")
  .findOne({email})
  
  return user;



}
async function saveResetCode(userId, resetCode, expiry) {
  try {
    await ensureConnection();

    const result = await client
      .db("FocusZoo")
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) }, // make sure you use ObjectId
        { 
          $set: { 
            resetCode: resetCode,
            resetCodeExpiry: expiry 
          } 
        }
      );

    if (result.modifiedCount === 1) {
      return { success: true };
    } else {
      return { success: false, error: "User not found or not updated." };
    }
  } catch (err) {
    console.error("Error saving reset token:", err);
    return { success: false, error: "Something went wrong." };
  }
}
async function changePassword(userId,newpassword)
{
  try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newpassword, saltRounds);
    await ensureConnection();
    const result = await client
      .db("FocusZoo")
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) }, // make sure you use ObjectId
        { 
          $set: { 
            passwordHash: hashedPassword,            
          } 
        }
      

      );


  }
  catch (err) {
    console.error("Error saving reset token:", err);
    return { success: false, error: "Something went wrong." };
  }
}




module.exports = { 
  register,
  login,
  findByEmail,
  saveResetCode,
  changePassword,

  

 };