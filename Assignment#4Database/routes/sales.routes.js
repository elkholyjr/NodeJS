const express = require("express");
const router = express.Router();
const { recordSale, retrieveSales, retrieveSalesByProduct } = require("../controllers/sales.controller");

// Record a Sale
router.post("/RecordSale", recordSale);

// Retrieve Sales
router.get("/RetrieveSales", retrieveSales);

// Retrieve Sales for specific product
router.get("/RetrieveSales/:product_id", retrieveSalesByProduct);


module.exports = router;