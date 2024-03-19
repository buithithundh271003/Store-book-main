import Joi from 'joi';

export const categorySchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    products: Joi.array(),
})