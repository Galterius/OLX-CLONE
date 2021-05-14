const bcrypt = require('bcryptjs');
//database requirements
const User = require('../models/user-models');

exports.registerUser = async (
  userEmail,
  userPassword,
  userName,
  userBirthday,
  userPhoneNumber,
) => {
  try {
    console.log(userEmail, userPassword, userName);
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return 'User already exists';
    }

    const hashedPassword = await bcrypt.hash(userPassword, 12);
    const result = await User.create({
      name: userName,
      email: userEmail,
      birthday: userBirthday,
      phoneNumber: userPhoneNumber,
      password: hashedPassword,
    });

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.loginUser = async (userEmail, userPassword) => {
  try {
    const existingUser = await User.findOne({ email: userEmail }).select(
      '+password',
    );

    if (!existingUser) {
      return "User doesn't exists";
    }

    const isPasswordCorrect = await bcrypt.compare(
      userPassword,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return 'Invalid email or password';
    }

    console.log(existingUser);

    return existingUser;
  } catch (error) {
    console.log(error);
    return 'Something went wrong';
  }
};
