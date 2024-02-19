const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token,"secret",(err,decoded) => {
            if(decoded){
                req.body.userID = decoded.userID;
                req.body.author = decoded.username;
                next();
            }else{
                res.status(401).send({"mssg":"You're not authorized"});
            }
        })
    }else{
        res.status(400).json({"mssg":"You're not logged in."})
    }
}

module.exports = {
    auth
}