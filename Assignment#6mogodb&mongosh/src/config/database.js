const { MongoClient } = require("mongodb");

let client;
let database;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.DB_NAME || "assignment7";
  client = new MongoClient(uri);
  await client.connect();
  database = client.db(dbName);
  console.log(`Connected to MongoDB database: ${dbName}`);
}

function getDatabase() {
  if (!database) throw new Error("Database is not connected");
  return database;
}

async function closeDatabase() {
  if (client) await client.close();
}

module.exports = { connectToDatabase, getDatabase, closeDatabase };
