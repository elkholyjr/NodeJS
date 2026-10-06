const pool = require("../config/RetailStoreDB");

async function recordSale(req, res) {
    const { product_id, quantity_sold, sale_date } = req.body;

    const [result] = await pool.query(
        "INSERT INTO Sales (product_id, quantity_sold, sale_date) VALUES (?, ?, ?)",
        [product_id, quantity_sold, sale_date]
    );

    res.status(201).json({
        id: result.insertId,
        product_id,
        quantity_sold,
        sale_date
    });
}

async function retrieveSales(req, res) {
    const [sales] = await pool.query(
        "SELECT * FROM Sales"
    );
    res.json(sales);
}

async function retrieveSalesByProduct(req, res) {
    const { product_id } = req.params;

    const [sales] = await pool.query(
        "SELECT * FROM Sales WHERE product_id = ?",
        [product_id]
    );

    res.json(sales);
}

module.exports = {
    recordSale,
    retrieveSales,
    retrieveSalesByProduct
};