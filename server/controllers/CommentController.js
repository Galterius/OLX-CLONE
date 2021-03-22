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
    try {
        const { comment_id } = req.params;
        const deleted = await Comments.findByIdAndRemove(comment_id)
        res.status(200).json(deleted);
    } catch (error) {
        console.log(error)
        res.status(409).json({message: "an error has occurred"})
    }

}

exports.editComment = async (req, res) => {
    const { comment_id } = req.params;
    console.log(comment_id);
    console.log(req.body);
    try {
        const { comment_id } = req.params;
        await Comments.findByIdAndUpdate(comment_id, {...req.body})
    } catch (error) {
        console.log(error)
        res.status(409).json({message: "an error has occurred"})
    }

}