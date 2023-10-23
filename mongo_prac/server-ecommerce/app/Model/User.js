import Joi from "joi";

const userSchema = Joi.object({
    username_user: Joi.string()
        .min(3)
        .max(18)
        .required(),

    realname_user: Joi.string()
        .min(3)
        .max(25),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    phone_user: Joi.string()
        .min(8)
        .max(13),

    address_user: Joi.string()
        .min(10)
        .max(30)
});

export default userSchema;