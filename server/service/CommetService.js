const Listing = require('../models/listings');
const Comments = require('../models/comments');

exports.createCommentServie = async(id, commentData) =>{
    try {
        const listing = await Listing.findById(id);

        const newComment = await Comments.create({...commentData})
        await newComment.save()

        await listing.comments.push(newComment);
        await listing.save();

        return newComment;
        
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
        const { listingId } = deletedComment;
        
        let commentListing = await Listing.findById(listingId)

        commentListing.comments = commentListing.comments.filter((comment) => comment != commentId);

        const updatedListing = await Listing.updateOne({_id: listingId}, commentListing);

        return updatedListing
    } catch (error) {
        console.log(error)
        return error.message;
    }
};