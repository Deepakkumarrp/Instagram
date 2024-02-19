const express = require("express");
const { connection } = require("./config/db");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./Routes/user.routes");
const { pictureRouter } = require("./Routes/pictures.routes");

// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/pictures",pictureRouter);

app.listen(process.env.PORT, async() => {
    try{
        await connection;
        console.log("db running");
        console.log(`Running at server ${process.env.PORT}`);
    }catch(err){
        console.log(err);
    }
})