const service = require("./collection.service");

async function createBooks(req, res) {
  res.status(200).json(await service.createBooksCollection());
}
async function createAuthors(req, res) {
  res.status(201).json(await service.createAuthorsCollectionImplicitly(req.body));
}
async function createCappedLogs(req, res) {
  res.status(200).json(await service.createCappedLogsCollection());
}
async function createBooksIndex(req, res) {
  res.status(200).json(await service.createBooksTitleIndex());
}
module.exports = { createBooks, createAuthors, createCappedLogs, createBooksIndex };
