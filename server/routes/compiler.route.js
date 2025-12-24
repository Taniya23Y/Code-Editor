const express = require("express");
const { isAuthenticated } = require("../middleware/auth.middleware");
const router = express.Router();
const compilerController = require("../controllers/compiler.controller");

router.post("/save", isAuthenticated, compilerController.saveCode);
router.post("/load", isAuthenticated, compilerController.loadCode);
router.delete("/delete/:id", isAuthenticated, compilerController.deleteCode);
router.put("/edit/:id", isAuthenticated, compilerController.editCode);
router.get("/get-all-codes", compilerController.getAllCodes);
router.get("/my-codes", isAuthenticated, compilerController.getMyCodes);

module.exports = router;
