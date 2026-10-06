const pool = require("../config/RetailStoreDB");

async function getProducts(req, res) {

    const [products] = await pool.query(
        "SELECT * FROM Products"
    );

    res.json(products);
}

async function createProduct(req, res) {
    const { product_name, price, stock_quantity, supplier_id } = req.body;

    const [result] = await pool.query(
        "INSERT INTO Products (product_name, price, stock_quantity, supplier_id) VALUES (?, ?, ?, ?)",
        [product_name, price, stock_quantity, supplier_id]
    );

    res.status(201).json({
        id: result.insertId,
        product_name,
        price,
        stock_quantity,
        supplier_id
    });
}

async function getProductID(req, res) {
    const { id } = req.params;

    const [product] = await pool.query(
        "SELECT * FROM Products WHERE product_id = ?",
        [id]
    );

    if (product.length === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product[0]);
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const { product_name, price, stock_quantity, supplier_id } = req.body;

    const [result] = await pool.query(
        "UPDATE Products SET product_name = ?, price = ?, stock_quantity = ?, supplier_id = ? WHERE product_id = ?",
        [product_name, price, stock_quantity, supplier_id, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
}

async function deleteProduct(req, res) {
    const { id } = req.params;

    const [result] = await pool.query(
        "DELETE FROM Products WHERE product_id = ?",
        [id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
}

async function addCategory(req, res) {
    await pool.query(
        "ALTER TABLE Products ADD COLUMN category VARCHAR(255)"
    );

    res.json({
        message: "Category column added successfully"
    });
}

async function DeleteCategory(req, res) {
    await pool.query(
        "ALTER TABLE Products DROP COLUMN category"
    );

    res.json({
        message: "Category column deleted successfully"
    });
}

async function addNotNull(req, res) {
    await pool.query(
        "ALTER TABLE Products MODIFY product_name VARCHAR(255) NOT NULL"
    );

    res.json({
        message: "NOT NULL constraint added to product_name column successfully"
    });
}

async function updateBreadPrice(req, res) {

    const [result] = await pool.query(
        `UPDATE Products
         SET price = 25.00
         WHERE product_name = 'Bread'`
    );

    res.json({
        message: "Bread price updated successfully"
    });
}

async function deleteEggs(req, res) {

    await pool.query(
        `DELETE FROM Sales
         WHERE product_id = (
             SELECT product_id
             FROM Products
             WHERE product_name = 'Eggs'
         )`
    );

    const [result] = await pool.query(
        `DELETE FROM Products
         WHERE product_name = 'Eggs'`
    );

    res.json({
        message: "Eggs deleted successfully"
    });
}

async function getTotalQuantitySold(req, res) {

    const [rows] = await pool.query(`
        SELECT
            p.product_id,
            p.product_name,
            COALESCE(SUM(s.quantity_sold), 0) AS total_quantity_sold
        FROM Products p
        LEFT JOIN Sales s
            ON p.product_id = s.product_id
        GROUP BY p.product_id, p.product_name
    `);

    res.json(rows);
}

async function getHighestStock(req, res) {

    const [rows] = await pool.query(`
        SELECT *
        FROM Products
        ORDER BY stock_quantity DESC
        LIMIT 1
    `);

    res.json(rows);
}

async function getSuppliersStartingWithF(req, res) {

    const [rows] = await pool.query(`
        SELECT *
        FROM Suppliers
        WHERE supplier_name LIKE 'F%'
    `);

    res.json(rows);
}

async function getNeverSoldProducts(req, res) {

    const [rows] = await pool.query(`
        SELECT
            p.product_id,
            p.product_name,
            p.price,
            p.stock_quantity
        FROM Products p
        LEFT JOIN Sales s
            ON p.product_id = s.product_id
        WHERE s.product_id IS NULL
    `);

    res.json(rows);
}

async function getAllSales(req, res) {

    const [rows] = await pool.query(`
        SELECT
            p.product_name,
            s.quantity_sold,
            s.sale_date
        FROM Sales s
        INNER JOIN Products p
            ON s.product_id = p.product_id
    `);

    res.json(rows);
}

module.exports = {
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
};