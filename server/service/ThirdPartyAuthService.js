const GoogleUser = require('../models/google-model');

exports.googleUserAuthentication = async (userData) => {
  try {
    const existingUser = await GoogleUser.findOne({ sub: userData.sub });

    if (existingUser) {
      return existingUser;
    }

    const result = await GoogleUser.create(userData);
    return result;
  } catch (error) {
    console.log(error);
  }
};
