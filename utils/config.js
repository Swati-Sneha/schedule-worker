require('dotenv').config();
module.exports.MONGO_DB = process.env.MONGO_DB;

module.exports.TOKEN_HEADER_KEY = process.env.TOKEN_HEADER_KEY;

module.exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports.USER_NAME = process.env.USER_NAME;

module.exports.USER_PASSWORD = process.env.USER_PASSWORD