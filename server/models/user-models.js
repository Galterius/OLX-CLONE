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
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      sparse: true,
    },
    password: {
      type: String,
      select: false,
    },
    GoogleID: {
      type: String,
      sparse: true,
    },
  },
  { strict: false },
);

module.exports = mongoose.model('User', UserSchema);
