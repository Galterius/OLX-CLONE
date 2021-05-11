const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

//database requirements
const userService = require('../service/UserService');
const userMapper = require('../mappers/UserMapper');
const thirdPartyAuth = require('../service/ThirdPartyAuthService');
const { Config } = require('../config/config');

exports.registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);

  try {
    const registeredUser = await userService.registerUser(
      email,
      password,
      name,
    );

    if (registeredUser === 'User already exists') {
      res.status(400).json({ message: 'User already exists' });
    }

    const mappedToken = userMapper.tokenMapper(registeredUser);
    const token = jwt.sign(mappedToken, 'test', { expiresIn: '1h' });

    const result = userMapper.authenticationMapper(registeredUser);

    //sending back the user and the token
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userService.loginUser(email, password);

    if (existingUser == "User doesn't exists") {
      res.status(404).json({ message: 'User does not exist' });
    }

    if (existingUser == 'Invalid email or password') {
      res.status(404).json({ message: 'Invalid email or password' });
      return;
    }
    const mappedToken = userMapper.tokenMapper(existingUser);
    const token = jwt.sign(mappedToken, Config.JwtSecret, { expiresIn: '1h' });

    const result = userMapper.authenticationMapper(existingUser);

    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.googleSignIn = async (req, res) => {
  try {
    const userToken = Object.keys(req.body);
    const CLIENT_ID = Config.ClientID;
    const client = new OAuth2Client(CLIENT_ID);

    const userResult = await verify(client, userToken, CLIENT_ID);

    //gets the user from the database or if its a registration then stores it
    const authResult = await thirdPartyAuth.googleUserAuthentication(
      userResult,
    );

    //doesn't return the _v,password/sub from database
    const mappedToken = userMapper.tokenMapper(authResult);
    const token = jwt.sign(mappedToken, Config.JwtSecret, { expiresIn: '1h' });

    const result = userMapper.authenticationMapper(authResult);

    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log(error);
  }
};

async function verify(client, userToken, CLIENT_ID) {
  const ticket = await client.verifyIdToken({
    idToken: userToken[0],
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (
    payload.aud == CLIENT_ID &&
    (payload.iss == 'accounts.google.com' ||
      payload.iss == 'https://accounts.google.com')
  ) {
    return { name: payload.name, email: payload.email, sub: payload.sub };
  }
}
