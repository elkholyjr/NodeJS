const express = require("express");
const router = express.Router();
const { initializeData } = require("../controllers/init.controller");

router.post("/", initializeData);

module.exports = router;