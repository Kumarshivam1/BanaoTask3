const mongoose = require("mongoose");

//route handler
const likeSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"POST",
    }

})
module.exports = mongoose.model("Like",likeSchema);