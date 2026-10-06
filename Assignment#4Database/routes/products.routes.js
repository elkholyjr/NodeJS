const express = require("express");

const router = express.Router();

const { 
    getProducts, 
    createProduct, 
    getProductID, 
    updateProduct, 
    deleteProduct, 
    addCategory, 
    DeleteCategory, 
    addNotNull,
    updateBreadPrice,
    deleteEggs,
    getTotalQuantitySold,
    getHighestStock,
    getSuppliersStartingWithF,
    getNeverSoldProducts,
    getAllSales
} = require("../controllers/products.controller");

// Create a product
router.post("/addproduct", createProduct);

// Retrieve all products
router.get("/retrieveproducts", getProducts);

// Retrieve products by id
router.get("/retrieveproduct/:id", getProductID);

// Update a product
router.put("/updateproduct/:id", updateProduct);

// Delete a product
router.delete("/deleteproduct/:id", deleteProduct)

//Add category column to products table
router.post("/category", addCategory);

//Delete category column from products table
router.delete("/DeleteCategory", DeleteCategory);

// ADD not null constraint to product_name column
router.post("/addnotnull", addNotNull);

// Additional endpoints for specific operations
router.put("/update-bread-price", updateBreadPrice);

// Delete Eggs from Products table
router.delete("/delete-eggs", deleteEggs);

// Reports endpoints
router.get("/reports/total-sold", getTotalQuantitySold);

// Get product with highest stock quantity
router.get("/reports/highest-stock", getHighestStock);

// Additional reports endpoints
router.get("/reports/suppliers-f", getSuppliersStartingWithF);

// Get products that have never been sold
router.get("/reports/never-sold", getNeverSoldProducts);

// Get all sales with product names
router.get("/reports/all-sales", getAllSales);


module.exports = router;