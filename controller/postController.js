const Post = require("../Model/postSchema");

//@createPost
exports.createPost = async(req,res)=>{
    try{
        const {description} = req.body;
        const response = await Post.create({user_id:req.user.id,description:description});
        res.status(200).json({
            message:"Post Create Successfully",
            success: true
        })
    }
    catch(err){
        return res.status(400).json({
            message:"Post Creation UnSuccessfull",
            success: false,
            data: err.message
        })
    }
};

//updatePost
exports.updatePost = async(req,res)=>{
    try{
        const {description} = req.body;
        const id = req.params.id;
        console.log(id);
        const checkUser = await Post.findOne({_id:id});
        console.log(checkUser.user_id+' '+req.user.id);
        if(checkUser.user_id!=req.user.id){
            return res.status(400).json({
                result:false,
                error:"token Not Matching"
            })
        }
        if(!checkUser){
            return res.status(400).json({
                message:"Enter proper Id"
            })
        }
        const respose = await Post.findOneAndUpdate({_id:id},{description:description});
        res.status(200).json({
            message:"Updation of Post Successful",
            success:true
        });
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Updation of post failed",
            data:err.message
        })
    }
}

//@deletePost
exports.deletePost = async(req,res)=>{
    try{
        const id = req.params.id;
        const checkUser = await Post.findOne({_id:id});
        if(!checkUser){
            return res.status(400).json({
                success:false,
                message:"Incorrect Id provided"
            })
        }
        if(checkUser.user_id!=req.user.id){
            return res.status(400).json({
                result:false,
                error:"token Not Matching"
            })
        }
        const response = await Post.findOneAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:"Deletion Successfull"
        })
    }
    catch(err){
        return res.status(400).json({
            message:"Deletion Unsuccessfull",
            data:err.message
        })
    }
}

//@getPost
exports.getPost = async(req,res)=>{
    try{
        const id = req.params.id;
        const checkUser = await Post.findOne({_id:id});
        if(!checkUser){
            return res.status(400).json({
                success:false,
                message:"Incorrect Id provided"
            })
        }
        if(checkUser.user_id!=req.user.id){
            return res.status(400).json({
                result:false,
                error:"token Not Matching"
            })
        }
        return res.status(200).json({
            success:true,
            message:checkUser
        })
    }
    catch(err){
        return res.status(400).json({
            message:"Retrival Unsuccessfull",
            data:err.message
        })
    }
}