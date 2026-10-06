const express = require("express");
const router = express.Router();

const { createSupplier, retrieveSuppliers, updateSupplier,  deleteSupplier, ChangePhoneNumber} = require("../controllers/suppliers.controller");

// Create a supplier
router.post("/createSupplier", createSupplier);

//Retrieve all suppliers.
router.get("/getSuppliers", retrieveSuppliers);

//Update supplier information.
router.put("/updateSupplier/:id", updateSupplier);

//Delete a supplier.
router.delete("/deleteSupplier/:id", deleteSupplier);

//Change phone number column to VARCHAR(15)
router.post("/ChangePhoneNumber", ChangePhoneNumber);

module.exports = router;