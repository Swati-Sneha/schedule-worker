const settings = require('../utils/config');
const errors = require('../utils/errors');
const jwt = require("jsonwebtoken");


module.exports.auth = function auth(username, password){
    let jwtSecretKey = settings.JWT_SECRET_KEY;

    if(username != settings.USER_NAME || password != settings.USER_PASSWORD){
        throw errors.invalidUser
    }

    let data = {
        time: Date(),
        username: username,
        password: password
    }
  
    let token = jwt.sign(data, jwtSecretKey);
  
    return token
}

module.exports.validateToken = function validateToken(headers){
    let token = null

    if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
        token = headers.authorization.split(' ')[1];
    }

    let jwtSecretKey = settings.JWT_SECRET_KEY;

    if(!token) throw errors.invalidAuth
  
    try {
        const verified = jwt.verify(token, jwtSecretKey);

        if(verified){
            return {};
        }else{
            throw errors.invalidAuth
            
        }
    } catch (error) {
        throw errors.invalidAuth
    }
}