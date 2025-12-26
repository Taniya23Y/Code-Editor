const express = require("express");
const router = express.Router();
const {
  saveLanguageCode,
  getLanguageCode,
  updateLanguageCode,
  getMyLanguageCodes,
} = require("../controllers/languageCode.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

router.post("/save", isAuthenticated, saveLanguageCode);
router.get("/my-langCodes", isAuthenticated, getMyLanguageCodes);
router.get("/:id", getLanguageCode);
router.put("/:id", isAuthenticated, updateLanguageCode);

module.exports = router;
