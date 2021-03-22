const Comments = require('../models/comments')

exports.listingOwner = async (req, res, next) =>{
    const senderId = req.userId
    const { listingCreator } = req.query;

    if(senderId == listingCreator){
        next();
    }else{
        console.log("invalid")
        res.status(403).json({message: "Invalid user"})
    }
}

exports.commentOwner = async (req, res, next)=>  {
    const senderId = req.userId
    const { comment_id } = req.params

    await Comments.findById(comment_id, (err, foundComment)=>{
        if(!err){
            const AUTHOR = foundComment?.author?.commenterId
            
            if(AUTHOR == senderId){
                next()
            }else{
                console.log("invalid")
                res.status(403).json({message: "Invalid user"})
            }
        }else{
            console.log(err)
        }
    });
    
}