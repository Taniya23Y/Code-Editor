const express = require("express");
const {
  saveSharedCode,
  getSharedCode,
} = require("../controllers/shareCode.controller");

const router = express.Router();

router.post("/save", saveSharedCode);
router.get("/:shareId", getSharedCode);

module.exports = router;
