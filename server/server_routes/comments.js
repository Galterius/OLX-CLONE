const express = require('express');
const router = express.Router();
const Comments = require('../models/comments')
const catchAsync = require('../utils/CatchAsync');
const auth = require('../middleware/auth')
const owner = require('../middleware/owner');
const Listing = require('../models/listings');

router.post('/', auth, catchAsync(async (req, res)=>{

    const listing = await Listing.findById(req.body.listingId, async (err, listing) =>
    {
        const newComment = await Comments.create({...req.body})
        newComment.save();
        listing.comments.push(newComment);
        listing.save();
    })
    res.status(200).json(listing)
    
}))

router.delete('/:comment_id', auth, catchAsync(async (req, res) => {
    const { comment_id } = req.params;
    const deleted = await Comments.findByIdAndDelete(comment_id)
    console.log(deleted);
    res.status(200).json(deleted);
}))

module.exports = router;