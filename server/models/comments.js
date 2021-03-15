const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        commenterId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        commenterName: String
    },
    listingId: String,
    comment: String
});

module.exports = mongoose.model('Comment', CommentSchema);