const router = require("express").Router();
const asyncHandler = require("../../shared/utils/async-handler");
const controller = require("./log.controller");
router.post("/logs", asyncHandler(controller.create));
module.exports = router;
