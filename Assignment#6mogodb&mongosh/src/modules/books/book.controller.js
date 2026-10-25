const service = require("./book.service");
async function create(req, res) { res.status(201).json(await service.insertBook(req.body)); }
async function batch(req, res) { res.status(201).json(await service.insertManyBooks(req.body.books || req.body)); }
async function updateFuture(req, res) { res.json(await service.updateFutureBook()); }
async function title(req, res) { const result = await service.findByTitle(req.query.title); if (!result) return res.status(404).json({ message: "Book not found" }); res.json(result); }
async function year(req, res) { res.json(await service.findByYearRange(req.query.from, req.query.to)); }
async function genre(req, res) { res.json(await service.findByGenre(req.query.genre)); }
async function skipLimit(req, res) { res.json(await service.findSkipLimit()); }
async function yearInteger(req, res) { res.json(await service.findIntegerYear()); }
async function excludeGenres(req, res) { res.json(await service.excludeGenres()); }
async function beforeYear(req, res) { res.json(await service.deleteBeforeYear(req.query.year)); }
async function aggregate1(req, res) { res.json(await service.aggregateAfter2000Sorted()); }
async function aggregate2(req, res) { res.json(await service.aggregateProjectionAfter2000()); }
async function aggregate3(req, res) { res.json(await service.aggregateUnwindGenres()); }
async function aggregate4(req, res) { res.json(await service.aggregateJoinLogs()); }
module.exports = { create, batch, updateFuture, title, year, genre, skipLimit, yearInteger, excludeGenres, beforeYear, aggregate1, aggregate2, aggregate3, aggregate4 };
