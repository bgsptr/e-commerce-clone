import Joi from "joi";

const orderSchema = Joi.object({
    total_order_item: Joi.string().required
});

export default orderSchema;