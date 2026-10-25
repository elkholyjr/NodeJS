require("dotenv").config();
const express = require("express");
const { connectToDatabase } = require("./src/config/database");
const { errorHandler, notFoundHandler } = require("./src/shared/middleware/error-handler");
const collectionRoutes = require("./src/modules/collections/collection.routes");
const bookRoutes = require("./src/modules/books/book.routes");
const logRoutes = require("./src/modules/logs/log.routes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Each domain is an internal module; all modules run in one Express process.
app.use("/collection", collectionRoutes);
app.use("/", bookRoutes);
app.use("/", logRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

connectToDatabase()
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((error) => {
    console.error("Failed to start application:", error);
    process.exit(1);
  });
