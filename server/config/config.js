require('dotenv').config({ path: './config/config.env' });

exports.Config = {
  ClientID: process.env.CLIENT_ID,
  ClientSecret: process.env.CLIENT_SECRET,
  JwtSecret: process.env.JWT_SECRET,
};
