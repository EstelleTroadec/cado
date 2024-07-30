import Joi from "joi";

const schema = Joi.object({

    nameSchema: Joi.string()
    .min(3) // min length 3 char
    .max(30) // maximum length 30 char
    .pattern(new RegExp('^[a-zA-Z]+$')) // only letters
    .required(),
    
    passwordSchema : Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
    .required(),

    confirmPasswordSchema : Joi.ref('passwordSchema'),

    emailSchema : Joi.string()
    .email({ tlds: { allow: false } }) // valid email format 
    .required(),
})