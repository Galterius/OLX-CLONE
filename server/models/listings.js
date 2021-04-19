const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: String,
    price: Number,
    image: [
        {
            type: String,
            required: true
        }
    ],
    description: String,
    creator: String,
    name: String,
    createdAt: {
        type: Date,
        defult: new Date()
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        }
    ],
    location: String
})

module.exports = mongoose.model('Listing', ListingSchema);