import Joi from "joi";

export default Joi.object({

    name: Joi.string()
    .min(3) // min length 3 char
    .max(30) // maximum length 30 char
    .pattern(new RegExp('^[a-zA-Z]+$')) // only letters
    .required(),

    password : Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
    .required(),

    confirmPassword : Joi.ref('passwordSchema'),

    email : Joi.string()
    .email({ tlds: { allow: false } }) // valid email format 
    .required(),
})