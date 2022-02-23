const {Validator, ValidationError} = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});
module.exports = {
    validate: validator.validate,
    ValidationError: ValidationError
}
