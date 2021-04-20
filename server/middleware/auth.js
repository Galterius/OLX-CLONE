const jwt = require('jsonwebtoken');

//check if the id actually exists with user model

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    //checking if the user is using google auth or not
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
