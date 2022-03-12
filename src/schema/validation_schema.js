const Joi = require('joi');

export const category_schema = Joi.object().keys({
    slugname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
});