const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/user.model");
const { BlacklistModel } = require("../Model/blacklist.model");

const userRouter = express.Router();


userRouter.post("/register",async (req,res) => {
    const {username, email, password, city, age ,gender} = req.body;
    try{
        const finduser = await UserModel.findOne({email});
        if(finduser){
            res.status(201).json({"mssg":"User already exist"})
        }else{
            bcrypt.hash(password, 8, async function(err, hash) {
                if(err){
                    res.status(400).json({err});
                }else{
                    const user = new UserModel({...req.body,password:hash})
                    await user.save();
                    res.status(200).json({"mssg":"New user registered"})
                }
            })
        }
    }catch(err){
        res.status(400).json({err});
    }
})

userRouter.post("/login",async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID:user._id, username: user.username }, 'secret', {expiresIn : "7d"});
                    res.status(200).json({
                        "mssg":"Successfully Logged In.", token
                    })
                }else{
                    res.status(201).json({"mssg":"Wrong Password"})
                }
            });
        }else{
            res.status(201).json({"mssg":"User doesn't exist"})
        }
    }catch(err){
        res.status(400).json({err});
    }
})

userRouter.get("/logout", async(req,res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try{
        const blacklistToken = new BlacklistModel(token);
        await blacklistToken.save();
        res.status(200).json({"mssg":"Successfully Logged Out."})
    }catch(err){
        res.status(400).json({err});
    }
})

module.exports = {
    userRouter
}