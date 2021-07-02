const Joi = require('joi');

function validateSignUp(request){
    const schema = Joi.object({
        name: Joi.string()
                .required()
                .min(3)
                .max(255),
        email: Joi.string()
                    .required()
                    .max(255)
                    .min(6),
        password: Joi.string()
                     .required()
                     .min(8)
                     .max(1024)
    });

    return schema.validate(request);
}

function validateLogin(request){
    const schema = Joi.object({
        email: Joi.string()
                    .required()
                    .max(255)
                    .min(6),
        password: Joi.string()
                     .required()
                     .min(8)
                     .max(1024)
    });

    return schema.validate(request);
}

module.exports.validateSignUpRequest = validateSignUp;
module.exports.validateLoginRequest = validateLogin;