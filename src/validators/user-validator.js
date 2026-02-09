const Joi = require("joi");

const userSignupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(20).required()
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    userSignupSchema,
    userLoginSchema
};
