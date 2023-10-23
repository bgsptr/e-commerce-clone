import Joi from "joi";

const itemShopSchema = Joi.object({
    id_user: Joi.number(),
    id_item: Joi.number().required(),
    specific_item_name: Joi.string().min(5).max(50).required(),
    total_stock_item: Joi.number().default(0),
    price_item: Joi.number().required(),
});

export default itemShopSchema;