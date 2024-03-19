import Joi from "joi";
export const registerSchema = Joi.object({
    fullname: Joi.string()
        .required()
        .messages({
            "string.empty": 'The "fullname" field cannot be empty!',
            "any.required": 'The "fullname" field is required!',
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Invalid email!",
            "string.empty": 'The "email" field cannot be empty!',
            "any.required": 'The "email" field is required!',
        }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "The 'password' field cannot be empty!",
        "string.min": "Password must be at least {#limit} characters!",
        "any.required": "The 'password' field is required!",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Re-enter password does not match!",
        "string.empty": "The 'confirm password' field cannot be empty!",
        "string.required": "The 'confirm password' field is required!",
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email!",
        "string.empty": 'The "email" field cannot be empty!',
        "any.required": 'The "email" field is required!',
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "The 'password' field cannot be empty!",
        "string.min": "Password must be at least {#limit} characters!",
        "any.required": "The 'password' field is required!",
    }),
});
