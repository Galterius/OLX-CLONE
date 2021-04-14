const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sub: {
        type: String,
        required: true,
        unique: true,
        select: false
    }
})

module.exports = mongoose.model('GoogleUser', GoogleUserSchema, 'users')