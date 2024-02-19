const express = require("express");
const { PictureModel } = require("../Model/picture.model");
const { auth } = require("../Middleware/auth.middleware");

const pictureRouter = express.Router();

pictureRouter.use(auth);

pictureRouter.post("/",async(req,res) => {
    try{
        const picture = PictureModel(req.body);
        await picture.save();
        res.status(200).json({"mssg":"New picture has been added"})
    }catch(e){
        res.status(400).json({err});
    }
})
pictureRouter.get("/",async(req,res) => {
    try{
        const pictures = await PictureModel.find({userID:req.body.userID});
        res.status(200).json({pictures})
    }catch(e){
        res.status(400).json({err});
    }
})

pictureRouter.patch("/:id",async(req,res) => {
    const {id} = req.params;
    try{
        const picture = await PictureModel.findOne({_id:id});
        if(picture.userID === req.body.userID){
            await PictureModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).json({"mssg":"The picture has been updated"})
        }else{
            res.status(201).json({"mssg":"You're not Authorized"})
        }
    }catch(e){
        res.status(400).json({err});
    }
})

pictureRouter.delete("/:id",async(req,res) => {
    const {id} = req.params;
    try{
        const picture = await PictureModel.findOne({_id:id});
        if(picture.userID === req.body.userID){
            await PictureModel.findByIdAndDelete({_id:id});
            res.status(200).json({"mssg":"The picture has been deleted"})
        }else{
            res.status(201).json({"mssg":"You're not Authorized"})
        }
    }catch(e){
        res.status(400).json({err});
    }
})

module.exports = {
    pictureRouter
}