const router = require("express").Router();
const asyncHandler = require("../../shared/utils/async-handler");
const controller = require("./collection.controller");

router.post("/books", asyncHandler(controller.createBooks));
router.post("/authors", asyncHandler(controller.createAuthors));
router.post("/logs/capped", asyncHandler(controller.createCappedLogs));
router.post("/books/index", asyncHandler(controller.createBooksIndex));

module.exports = router;
