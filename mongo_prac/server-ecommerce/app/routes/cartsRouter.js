import express from "express";
import tokenMiddleware from "../middleware/token.js";
import db from "../configs/sqlConfig.js";
import queryString from "query-string";
import qs from "qs";
import crypto from "crypto";

const router = express.Router();

router.get("/", tokenMiddleware, (req, res) => {
    console.log(res.locals)
    const values = [res.locals.info.id_user];
    db.query(`SELECT carts_products.*, itemsinanyshop.specific_item_name, itemsinanyshop.id_user AS seller, itemsinanyshop.price_item, carts.user_id AS customer
    FROM ((carts_products INNER JOIN itemsinanyshop ON carts_products.SKU = itemsinanyshop.SKU)
    INNER JOIN carts ON carts_products.cart_id = carts.cart_id) WHERE
    carts.user_id = ?`, values, (error, data) => {
        res.json(data);
    });
    console.log(req.headers);
});

router.patch("/:cartID", tokenMiddleware, (req, res) => {
    const cartID = req.params.cartID;
    const newQty = req.body.qty;
    // const newSKU = req.body.SKU;
    const id_user = res.locals.info.id_user;
    db.query(`UPDATE user_cart_fix SET qty = ${newQty}
    WHERE customer = '${id_user}' AND cart_id = ${cartID}`, (err, response) => {
        if(err) throw err;
        console.log(response);
        if(response.changedRows) {
            res.send({
                status: 200,
                message: "Success update the data",
                updated_data: response,
                body: {
                    qty: newQty
                }
            })
        } else {
            res.send({ 
                status: 400,
                message: "Data already exist, action failed to update cart" });
        }
    })
})

router.delete("/:cartID", tokenMiddleware, (req, res) => {
    const cartID = req.params.cartID;
    db.query(`DELETE FROM carts_products WHERE cart_id = ${cartID}`, 
    (err) => {
        if(err) throw err;
        db.query(`DELETE FROM carts WHERE cart_id = ${cartID}`, (err, response) => {
            if(err) throw err;
            if(response) {
                // res.redirect("/checkout");
                res.send({
                    status: 200,
                    body: cartID,
                    message: `Cart with ID ${cartID} Successfully Deleted`
                })
            } else {
                res.send({
                    status: 400,
                    message: `Cart with ID ${cartID} is Missing`
                })
            }
        })
    });
});

// router.delete("/:cartID", tokenMiddleware, (req, res) => {
//     const cartID = req.params.cartID;
//     db.query("DELETE FROM user_cart_fix WHERE cart_id = ?", 
//         [cartID], (err, data) => {
//         if(err) throw err;
//         console.log(data);
//     })
// });

router.post("/:cartID/checkout", tokenMiddleware, (req, res) => {
    db.query("SELECT * FROM carts A INNER JOIN carts_products B ON A.cart_id = B.cart_id AND B.cart_id = ?", 
    [req.params.cartID], (err, data) => {
        const state = {
            cart_id: req.params.cartID,
            sku: data[0].SKU
        }
        const querySend = queryString.stringify(state);
        console.log(req.baseUrl);
        res.redirect("http://localhost:3000/api/v1/checkout?" + querySend);
    })
})

export default router;
