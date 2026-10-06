const pool = require("../config/RetailStoreDB");

async function createSupplier(req, res) {
    const { supplier_name, contact_email, phone_number } = req.body;
    const [result] = await pool.query(
        "INSERT INTO Suppliers (supplier_name, contact_email, phone_number) VALUES (?, ?, ?)",
        [supplier_name, contact_email, phone_number]
    );
    res.status(201).json({
        id: result.insertId,
        supplier_name,
        contact_email,
        phone_number
    });
}

async function retrieveSuppliers(req, res) {
    const [suppliers] = await pool.query( "SELECT * FROM Suppliers");
    res.json(suppliers);
}

async function updateSupplier(req, res) {
    const { id } = req.params;
    const { supplier_name, contact_email, phone_number } = req.body;

    const [result] = await pool.query(
        "UPDATE Suppliers SET supplier_name = ?, contact_email = ?, phone_number = ? WHERE supplier_id = ?",
        [supplier_name, contact_email, phone_number, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Supplier not found" });
    }

    res.json({
        id,
        supplier_name,
        contact_email,
        phone_number    
    });
}

async function deleteSupplier(req, res) {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM Suppliers WHERE supplier_id = ?", [id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Supplier not found" });
    }

    res.json({ message: "Supplier deleted successfully" });
}

async function ChangePhoneNumber(req, res) {
    await pool.query("ALTER TABLE Suppliers MODIFY phone_number VARCHAR(15)");
    res.json({ message: "Phone number column modified successfully" });
}

module.exports = {
    createSupplier,
    retrieveSuppliers,
    updateSupplier,
    deleteSupplier,
    ChangePhoneNumber
};