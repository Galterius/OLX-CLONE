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
        console.log(listing)
    })
    res.status(200).json(listing)
    
}))

module.exports = router;