const express = require("express");
const { isAuthenticated } = require("../middleware/auth.middleware");
const router = express.Router();
const { runProgram } = require("../controllers/codeRunner.controller");

router.post("/run", isAuthenticated, runProgram);

module.exports = router;
