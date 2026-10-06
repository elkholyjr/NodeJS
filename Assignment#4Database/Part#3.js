const express = require("express");
const pool = require("./config/RetailStoreDB");
const productRoutes = require("./routes/products.routes");
const supplierRoutes = require("./routes/suppliers.routes");
const salesRoutes = require("./routes/sales.routes");
const initRoutes = require("./routes/init.routes");


const app = express();
const port = 3000;


app.use(express.json());

//product routes      /products/....
app.use("/products", productRoutes);

//suppliers routes      /suppliers/....
app.use("/suppliers", supplierRoutes);

//sales routes      /sales/....
app.use("/sales", salesRoutes);

// 6. Create an API endpoint or initialization script to insert the following data:( 1.5 Grade)
app.use("/initialize", initRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});