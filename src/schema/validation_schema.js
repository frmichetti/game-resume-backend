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

export const game_schema = Joi.object().keys({
    app_id: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    system_id: Joi.number()
        .greater(0)
        .required(),
    title: Joi.string()
        .min(3)
        .required(),
    finished: Joi.boolean()
        .required(),
    finished_at: Joi.date()
        .less('now'),
    collection: Joi.boolean()
        .required(),
    genuine: Joi.boolean()
        .required(),
    fisical_disc: Joi.boolean()
        .required(),
});

export const tobuy_schema = Joi.object().keys({
    title: Joi.string()
        .min(3)
        .required(),
    finished: Joi.boolean()
        .required(),
    genuine: Joi.boolean()
        .required(),
    system: Joi.string()
        .min(2)
        .required()
});

export const virtualconsole_schema = Joi.object().keys({
    app_id: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    system_id: Joi.number()
        .greater(0)
        .required(),
    title: Joi.string()
        .min(3)
        .required(),
    finished: Joi.boolean()
        .required(),
    genuine: Joi.boolean()
        .required(),
});

export const dlc_schema = Joi.object().keys({
    app_id: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    title: Joi.string()
        .min(3)
        .required(),
    finished: Joi.boolean()
        .required(),
    collection: Joi.boolean()
        .required(),
});

export const playing_schema = Joi.object().keys({
    id: Joi.number()
        .greater(0)
        .required(),
    app_id: Joi.string()        
        .min(3)
        .max(30),
    title: Joi.string()
        .min(3)
        .required(),
});