const cors = require('cors');
const express = require('express')
const app = express()
const port = 5000

app.use(cors());

const userController=require("./controller/users")
app.use(express.json())
app.use("/users",userController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})