const Joi = require('@hapi/joi');

//RegisterValidation

const registerValidation = (data) => {
    
    const validSchema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });
    
    return validSchema.validate(data);

}

//LoginValidation
const loginValidation = (data) => {
    
    const validSchema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });
    
    return validSchema.validate(data);

}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
