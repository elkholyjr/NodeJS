const pool = require("../config/RetailStoreDB");

async function initializeData(req, res) {

    const [supplier]= await pool.query(
        "INSERT INTO suppliers (supplier_name, contact_email,phone_number) VALUES( ?, ?, ?)",
        ["FRESH FOODS", "contact@freshfoods.com", "01001234567"]
    );
    const supplierId = supplier.insertId;

    // 2. Add Milk
    await pool.query(
        `INSERT INTO Products
        (product_name, price, stock_quantity, supplier_id)
        VALUES (?, ?, ?, ?)`,
        ["Milk", 15.00, 50, supplierId]
    );


    // 3. Add Bread
    await pool.query(
        `INSERT INTO Products
        (product_name, price, stock_quantity, supplier_id)
        VALUES (?, ?, ?, ?)`,
        ["Bread", 10.00, 30, supplierId]
    );


    // 4. Add Eggs
    await pool.query(
        `INSERT INTO Products
        (product_name, price, stock_quantity, supplier_id)
        VALUES (?, ?, ?, ?)`,
        ["Eggs", 20.00, 40, supplierId]
    );
    // 5. Find Milk
    const [milkRows] = await pool.query(
        `SELECT product_id
         FROM Products
         WHERE product_name = ?`,
        ["Milk"]
    );

    const milkId = milkRows[0].product_id;


    // 6. Add sale
    await pool.query(
        `INSERT INTO Sales
        (product_id, quantity_sold, sale_date)
        VALUES (?, ?, ?)`,
        [milkId, 2, "2025-05-20"]
    );


    res.status(201).json({
        message: "Initial data inserted successfully"
    });
}

module.exports = {
    initializeData
};