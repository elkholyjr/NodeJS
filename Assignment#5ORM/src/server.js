import "dotenv/config";
import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/associations.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
  }
}

startServer();