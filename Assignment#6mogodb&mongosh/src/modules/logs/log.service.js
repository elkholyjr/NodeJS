const { getDatabase } = require("../../config/database");
async function createLog(log) {
  if (!log || !log.book_id) {
    const error = new Error("book_id is required");
    error.status = 400;
    throw error;
  }
  // Convert a 24-character hex string to ObjectId so $lookup can join logs to books.
  const normalized = { ...log };
  if (typeof normalized.book_id === "string" && /^[0-9a-fA-F]{24}$/.test(normalized.book_id)) {
    const { ObjectId } = require("mongodb");
    normalized.book_id = new ObjectId(normalized.book_id);
  }
  const result = await getDatabase().collection("logs").insertOne(normalized);
  return { acknowledged: result.acknowledged, insertedId: result.insertedId };
}
module.exports = { createLog };
