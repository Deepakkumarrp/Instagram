const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema({
    quote: String,
    photo : String,
    device : String,
    device : Number,
    userID: {
        type: String,
        required: true
    }
},{
    versionKey : false
})

const PictureModel = mongoose.model("picture",pictureSchema);

module.exports = {
    PictureModel
}