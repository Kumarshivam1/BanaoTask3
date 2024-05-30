const jwt = require("jsonwebtoken");
const validToken = (req,res,next)=>{
    try{
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            jwt.verify(token,"kumar",(err,decoded)=>{
                if(err){
                    return res.status(401).json({
                        success:false,
                        response:err.message,
                        res:err,
                        error:"User is not authorized"
                    })
                }
                req.user = decoded.user;
                next();
            })
        }
        if(!token){
            return res.status(401).json({
                success:false,
                response:"Token not provided"
            })
        }
    }
    catch(err){
        res.status(401).json({
            success:false,
            response:err.message
        })
    }
}

module.exports = validToken;