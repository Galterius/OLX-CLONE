const User = require('../models/user-models');

exports.googleUserAuthentication = async (userData) => {
  try {
    const existingUser = await User.findOne({ sub: userData.sub });

    if (existingUser) {
      return existingUser;
    }

    const result = await User.create(userData);
    return result;
  } catch (error) {
    console.log(error);
  }
};
