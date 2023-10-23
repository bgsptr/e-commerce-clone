import express from "express";
import db from "../configs/sqlConfig.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query(
    "SELECT id_item_category AS idCategory, name_item_category AS nameCategory FROM item_categories",
    (err, data) => {
      if (err) throw err;
      const newData = [];
      data.map((el) => {
        newData.push({
          id: el.idCategory,
          name: el.nameCategory,
        });
      });
      res.json({ status: 200, newData });
    }
  );
});

router.get("/:categoryID", (req, res) => {
  const idCategory = req.params.categoryID;
  db.query(
    "SELECT * FROM items WHERE id_item_category = ?", idCategory, (err, data) => {
      if(err) throw err;
      const newData = [];
      data.map((el) => {
        newData.push({
          id: el.id_item,
          name: el.general_item_name,
        });
      });
      res.json({ status: 200, newData});
    }
  )
});

router.get("/general/:generalItemID", (req, res) => {
  const id = req.params.generalItemID;
  db.query(
    "SELECT * FROM itemsinanyshop WHERE id_item = ?", id, (err, data) => {
      res.json({  status: 200, data: [...data]});
    }
  )
});

export default router;
