const mongoose = require("mongoose");

const comment =  mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    body:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Comment",comment);