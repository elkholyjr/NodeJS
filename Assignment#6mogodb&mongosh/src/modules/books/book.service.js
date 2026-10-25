const { getDatabase } = require("../../config/database");
const { ObjectId } = require("mongodb");
const books = () => getDatabase().collection("books");

function validateBook(book) {
  if (!book || typeof book.title !== "string" || !book.title.trim()) {
    const error = new Error("title is required and must be a non-empty string");
    error.status = 400;
    throw error;
  }
}

async function insertBook(book) {
  validateBook(book);
  const result = await books().insertOne(book);
  return { acknowledged: result.acknowledged, insertedId: result.insertedId };
}
async function insertManyBooks(items) {
  if (!Array.isArray(items) || items.length < 3) {
    const error = new Error("Provide an array containing at least three books");
    error.status = 400;
    throw error;
  }
  items.forEach(validateBook);
  const result = await books().insertMany(items);
  return { acknowledged: result.acknowledged, insertedIds: result.insertedIds };
}
async function updateFutureBook() {
  const result = await books().updateOne({ title: "Future" }, { $set: { year: 2022 } });
  return { acknowledged: result.acknowledged, matchedCount: result.matchedCount, modifiedCount: result.modifiedCount };
}
async function findByTitle(title) {
  if (!title) { const e = new Error("Query parameter 'title' is required"); e.status = 400; throw e; }
  return books().findOne({ title });
}
async function findByYearRange(from, to) {
  const start = Number(from), end = Number(to);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end) {
    const e = new Error("Provide valid from and to years, with from <= to"); e.status = 400; throw e;
  }
  return books().find({ year: { $gte: start, $lte: end } }).toArray();
}
async function findByGenre(genre) {
  if (!genre) { const e = new Error("Query parameter 'genre' is required"); e.status = 400; throw e; }
  return books().find({ genres: genre }).toArray();
}
async function findSkipLimit() {
  return books().find({}).sort({ year: -1 }).skip(2).limit(3).toArray();
}
async function findIntegerYear() {
  return books().find({ year: { $type: "int" } }).toArray();
}
async function excludeGenres() {
  return books().find({ genres: { $nin: ["Horror", "Science Fiction"] } }).toArray();
}
async function deleteBeforeYear(year) {
  const cutoff = Number(year);
  if (!Number.isFinite(cutoff)) { const e = new Error("Provide a valid year query parameter"); e.status = 400; throw e; }
  const result = await books().deleteMany({ year: { $lt: cutoff } });
  return { acknowledged: result.acknowledged, deletedCount: result.deletedCount };
}
async function aggregateAfter2000Sorted() {
  return books().aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]).toArray();
}
async function aggregateProjectionAfter2000() {
  return books().aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { _id: 0, title: 1, author: 1, year: 1 } }
  ]).toArray();
}
async function aggregateUnwindGenres() {
  return books().aggregate([
    { $unwind: "$genres" }
  ]).toArray();
}
async function aggregateJoinLogs() {
  return books().aggregate([
    { $lookup: { from: "logs", localField: "_id", foreignField: "book_id", as: "logs" } }
  ]).toArray();
}
module.exports = {
  insertBook, insertManyBooks, updateFutureBook, findByTitle, findByYearRange,
  findByGenre, findSkipLimit, findIntegerYear, excludeGenres, deleteBeforeYear,
  aggregateAfter2000Sorted, aggregateProjectionAfter2000, aggregateUnwindGenres, aggregateJoinLogs
};
