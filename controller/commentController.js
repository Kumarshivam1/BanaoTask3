//import model
const Post = require("../Model/postSchema");
const Comment = require("../Model/commentScema");

//Bussiness logic

//async kyuki hum main program flow ko disturb nhi karna chahte hai
exports.addComment = async (req, res) => {
  try {
    //fetch data from request ki body
    const { post, body} = req.body;
    const response = Comment.create({user_id:req.user.id,post,body});

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: response._id } },
      { new: true }
    )
      .populate("comments") //populate the comments array with comment documents [actuall commemt ajati hai]
      .exec();

    res.json({
      result : response
    });
  } catch (err) {
    return res.status(500).json({
      error: "error while creating comment",
    });
  }
};


