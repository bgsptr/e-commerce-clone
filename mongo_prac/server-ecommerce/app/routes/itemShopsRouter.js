import express from "express";
import db from "../configs/sqlConfig.js";
import itemShopSchema from "../Model/ItemShop.js";
import tokenMiddleware from "../middleware/token.js";
import queryString from "query-string";
import _ from "lodash";

const router = express.Router();

const baseURL = "http://localhost:3000/api/v1/items";

router.use(tokenMiddleware);

router.post("/addOurItem", (req, res) => {
  const cookie = req.session.cookie;
  console.log(cookie);
  if (!itemShopSchema.validate(req.body).error) {
    const { itemName, itemCategory, totalItem, priceItem } = req.body;
    const sqlUserID = `SELECT A.id_item AS itemID, B.id_user as userID, B.username_user AS 
        shopName from items A, users B WHERE general_item_name = '${itemCategory}'
        AND username_user = '${cookie.token.user}'`;
    db.query(sqlUserID, (err, data) => {
      const rowData = data[0];
      const sqlInsertItem = `INSERT INTO itemsinanyshop 
            (SKU, id_user, id_item, specific_item_name, total_stock_item, price_item)
            VALUES (NULL, ?, ?, ?, ?, ?)`;
      const values = [
        rowData.userID,
        rowData.itemID,
        itemName,
        totalItem,
        priceItem,
      ];
      db.query(sqlInsertItem, values, (err, result) => {
        if (err) throw err;
        res.send({
          message: "Item Berhasil Diinput pada Toko " + rowData.shopName,
        });
      });
    });
  } else {
    res.send({ message: itemShopSchema.validate(req.body).error.details });
  }
});

router.get("/", (req, res) => {
  console.log(res.locals.info);
  // get all items
  // `SELECT id_item, specific_item_name AS nameItem, price_item AS priceItem
  // FROM itemsinanyshop`
  res.render("index.ejs");
});

router.post("/clickItem", (req, res) => {
  const SKU = req.body.item;
  const query = {
    code: "aya",
    bo: true,
  };
  const values = [SKU];
  db.query(
    "SELECT id_item, id_user, specific_item_name AS itemName from itemsinanyshop WHERE SKU = ?",
    values,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      const itemID = data[0].id_item;
      const shopID = data[0].id_user;
      const itemName = _.kebabCase(data[0].itemName);
      res.redirect(`${baseURL}/${itemName}.i${itemID}.s${shopID}
        ?${queryString.stringify(query)}`);
    }
  );
});

router.get("/:itemDetailName", (req, res) => {
  const itemName = req.params.itemDetailName;
  const qty = req.body.qty;
  const str = itemName.split(".");
  const itemID = str[1].substring(1);
  const shopID = str[2].substring(1);
  const sql = `SELECT * FROM itemsinanyshop WHERE id_item = ${itemID} AND id_user = ${shopID}`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    const newData = data[0];
    const {
      SKU,
      id_user,
      id_item,
      specific_item_name,
      total_stock_item,
      price_item,
    } = newData;
    if (id_item && SKU) {
      let cart = [
        {
          itemID: id_item,
          SKU: SKU,
          isCart: true,
        },
      ];
      req.session.cart = cart;
    }
    console.log(req.session);
    res.json(newData);
  });
});

router.post("/:itemDetailName/cart", (req, res) => {
  const qty = req.body.qty;
  console.log(req.session);
  console.log(res.locals.info);
  const { itemID, SKU, isCart } = req.session.cart[0];
  const username = res.locals.info.username_user;
  const userID = res.locals.info.id_user;
  console.log(itemID);
  const values = [userID, SKU, qty];
  const values2 = [SKU, username];

  db.query(
    `SELECT A.user_id, A.username_user as username, carts_products.* FROM (SELECT carts.*, users.username_user FROM carts INNER JOIN users ON carts.user_id = users.id_user) AS A
        INNER JOIN carts_products ON A.cart_id = carts_products.cart_id
        WHERE SKU = ? AND username_user = ?`,
    values2,
    (error, check) => {
      if (error) throw error;
      console.log(check);
      if (check[0] != null) {
        console.log(
          `Data with user: ${check[0].username} and SKU: ${check[0].SKU} already exist in Cart`
        );
        res.redirect("..");
      } else {
        // First, insert into the carts table
        db.query(
          "INSERT INTO carts (user_id) VALUES (?)",
          [userID],
          (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({
                status: 500,
                message: "Internal Server Error",
              });
              return;
            }
            console.log(data);
            if (data.affectedRows !== 0) {
              // The first INSERT was successful, now insert into carts_products
              db.query(
                "INSERT INTO carts_products (cart_id, SKU, qty) VALUES (?, ?, ?)",
                [data.insertId, SKU, qty],
                (err2, data2) => {
                  if (err2) {
                    console.error(err2);
                    res.status(500).json({
                      status: 500,
                      message: "Internal Server Error",
                    });
                    return;
                  }

                  console.log(data2);
                  res.json({
                    status: 200,
                    message: "Success Insert to Cart",
                  });
                }
              );
            } else {
              res.status(404).json({
                status: 404,
                message:
                  "Can't fetch the item because the item has been sold by the user itself",
              });
            }
          }
        );
      }
    }
  );
});

export default router;
