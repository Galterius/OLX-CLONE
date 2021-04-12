const Listing = require('../models/listings');
const Comments = require('../models/comments');

exports.createCommentServie = async(id, commentData) =>{
    try {
        const listing = await Listing.findById(id, async()=>{
            const newComment = await Comments.create({...commentData})
            newComment.save()
            listing.comments.push(newComment);
            listing.save();
        });

        return listing;
        
    } catch (error) {
        console.log(error)
        return error.message;
    }
};

exports.editCommentServie = async(commentId, updatedComment)=>{
    try {
        const updated = await Comments.findByIdAndUpdate(commentId, {...updatedComment})
        return updated
    } catch (error) {
        console.log(error)
        return error.message;
    }
};

exports.deleteCommentService = async(commentId)=>{
    try {
        //the new comments have different id so i cannot delete them, the best thing i can do is check the length and if its no 24 then delete the last comment from that listing
        const deletedComment = await Comments.findByIdAndRemove(commentId);
        return deletedComment
    } catch (error) {
        console.log(error)
        return error.message;
    }
};