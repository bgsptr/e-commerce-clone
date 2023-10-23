import express from "express";
import path from "path";
import __dirname from "../../views/routeView.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  const item = req.body.item;
  const url = "https://app.midtrans.com/snap/v1/transactions";

  const SERVER_KEY = "Mid-server-3U9_w9ADjd7A3Io4aMjcPVVF:";

  const AUTH_STRING = Buffer.from(SERVER_KEY).toString("base64");

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${AUTH_STRING}`,
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: "1",
        gross_amount: 260000,
      },
      item_details: [
        {
          id: "9",
          price: 65000,
          quantity: 4,
          name: "Charger Chancong",
          merchant_name: "Samsung"
        }
      ],
    }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse) {
        res.status(200).json(jsonResponse);
      }
    })
    .catch((err) => console.log(err));
});

export default router;
