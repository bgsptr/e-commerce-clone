import express from "express";
import db from "../configs/sqlConfig.js";

const router = express.Router();

// router.get("/", (req, res) => {
//     const {cart_id, sku} = req.query;
//     const sql = `CALL fetch_cart(?, ?)`;
//     db.query(sql, [sku, cart_id], (err, data) => {
//         if(err) {
//             console.log(err);
//             return res.status(500).json({ message: err.message });
//         }
//         if(data && data[0] && data[0][0]) {
//             const cartData = data[0][0];
//             const customData = {
//                 cartID: cartData.cart_id,
//                 userID: cartData.user_id, 
//                 item: {
//                     sku: cartData.SKU,
//                     name: cartData.specific_item_name,
//                     qty: cartData.qty,
//                     priceItem: cartData.price_item
//                 }
//             }
//             res.send(customData);
//         }
//     })
// });

router.get("/", (req, res) => {
    
});

export default router;
