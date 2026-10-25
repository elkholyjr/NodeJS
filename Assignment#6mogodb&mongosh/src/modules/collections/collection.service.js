const { getDatabase } = require("../../config/database");

async function createBooksCollection() {
  const db = getDatabase();
  const existing = await db.listCollections({ name: "books" }, { nameOnly: true }).hasNext();
  if (existing) {
    // MongoDB does not replace an existing collection's validator automatically.
    await db.command({
      collMod: "books",
      validator: { $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: { title: { bsonType: "string", minLength: 1, description: "title must be a non-empty string" } }
      }},
      validationLevel: "strict",
      validationAction: "error"
    });
  } else {
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "title must be a non-empty string"
            }
          }
        }
      },
      validationLevel: "strict",
      validationAction: "error"
    });
  }
  return { ok: 1, collection: "books", validatorApplied: true };
}

async function createAuthorsCollectionImplicitly(author) {
  if (!author || typeof author.name !== "string" || !author.name.trim()) {
    const error = new Error("Provide a non-empty author name");
    error.status = 400;
    throw error;
  }
  const result = await getDatabase().collection("authors").insertOne(author);
  return { acknowledged: result.acknowledged, insertedId: result.insertedId };
}

async function createCappedLogsCollection() {
  const db = getDatabase();
  const exists = await db.listCollections({ name: "logs" }, { nameOnly: true }).hasNext();
  if (exists) {
    const info = await db.listCollections({ name: "logs" }).next();
    if (info.options && info.options.capped) return { ok: 1, collection: "logs", capped: true, size: info.options.size };
    const error = new Error("Collection 'logs' already exists and is not capped. MongoDB cannot convert it in place; rename/drop it manually before retrying.");
    error.status = 409;
    throw error;
  }
  await db.createCollection("logs", { capped: true, size: 1024 * 1024 });
  return { ok: 1, collection: "logs", capped: true, size: 1024 * 1024 };
}

async function createBooksTitleIndex() {
  const indexName = await getDatabase().collection("books").createIndex({ title: 1 });
  return { acknowledged: true, indexName };
}

module.exports = {
  createBooksCollection,
  createAuthorsCollectionImplicitly,
  createCappedLogsCollection,
  createBooksTitleIndex
};
