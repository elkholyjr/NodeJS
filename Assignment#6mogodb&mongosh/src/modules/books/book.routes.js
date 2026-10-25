const router = require("express").Router();
const asyncHandler = require("../../shared/utils/async-handler");
const c = require("./book.controller");

router.post("/books", asyncHandler(c.create));
router.post("/books/batch", asyncHandler(c.batch));
router.patch("/books/Future", asyncHandler(c.updateFuture));
router.get("/books/title", asyncHandler(c.title));
router.get("/books/year", asyncHandler(c.year));
router.get("/books/genre", asyncHandler(c.genre));
router.get("/books/skip-limit", asyncHandler(c.skipLimit));
router.get("/books/year-integer", asyncHandler(c.yearInteger));
router.get("/books/exclude-genres", asyncHandler(c.excludeGenres));
router.delete("/books/before-year", asyncHandler(c.beforeYear));
router.get("/books/aggregate1", asyncHandler(c.aggregate1));
router.get("/books/aggregate2", asyncHandler(c.aggregate2));
router.get("/books/aggregate3", asyncHandler(c.aggregate3));
router.get("/books/aggregate4", asyncHandler(c.aggregate4));

module.exports = router;
