const mongoose = require("mongoose");

const sharedCodeSchema = new mongoose.Schema(
  {
    shareId: { type: String, required: true, unique: true },
    language: { type: String, required: true },
    sourceCode: { type: String, required: true },
    input: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SharedCode", sharedCodeSchema);
