const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    birthday: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      select: false,
    },
    sub: {
      type: String,
      default: null,
    },
  },
  { strict: false },
);

module.exports = mongoose.model('User', UserSchema);
