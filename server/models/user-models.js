const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
