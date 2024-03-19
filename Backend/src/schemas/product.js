import Joi from "joi";

export const productSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    author: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required().min(0),
    categoryId: Joi.string(),
    images: Joi.array().required(),
})