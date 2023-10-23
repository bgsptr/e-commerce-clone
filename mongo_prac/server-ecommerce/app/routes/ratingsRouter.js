import db from "../configs/sqlConfig.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT * FROM v_items_rating_shop", (err, result) => {
        res.json(result);
    })
});

export default router;