const Listing = require('../models/listings');
const Comments = require('../models/comments')

exports.createComment = async (req, res)=>{

    const listing = await Listing.findById(req.body.listingId, async (err, listing) =>
    {
        const newComment = await Comments.create({...req.body})
        newComment.save();
        listing.comments.push(newComment);
        listing.save();
    })
    res.status(200).json(listing)
    
}

exports.deleteComment = async (req, res) => {
    const { comment_id } = req.params;
    const deleted = await Comments.findByIdAndRemove(comment_id)
    console.log(deleted);
    res.status(200).json(deleted);
}