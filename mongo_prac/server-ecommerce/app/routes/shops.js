import db from "../configs/sqlConfig.js";
import express, { query } from "express";

const router = express.Router();

// db.query(, async (err, countRows) => {
//         router.get("/", (req, res) => {
//         const countRow = countRows;
//         const rowsDisplay = countRow[0].countRowInShops;

//         if(rowsDisplay == 0) {
//             res.json({ message: "No Data Founded from Shop" });
//         } else {
//             db.query(Shop.queryGet(), (err, result) => {
//                 res.redirect(`/${}`);
//             });
//         }
//     });
// });

// router.post("/", async (req, res) => {
//     const { shopName, addressShop } = req.body;
//     const newShop = new Shop(shopName, addressShop);

//     db.query(newShop.queryPost(), (err, result) => {
//         if(err) throw err;
//         res.json({ message: "Successfully Inserted" });
//     });
// });

// router.get("/:shopName", (req, res) => {
//     const shopID = req.params.shopName;
//     const sqlSpecificID = `SELECT * FROM shops WHERE username_user = ${shopName}`;
//     db.query(sqlSpecificID, (err, result) => {
//         if(err) throw err;
//         res.json(result);
//     })
// });

// router.patch("/:ShopID", (req, res) => {
    
// });

export default router;