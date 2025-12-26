const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageCodeSchema = new Schema(
  {
    title: {
      type: String,
      default: "Untitled Code",
      trim: true,
    },

    language: {
      type: String,
      required: true,
      index: true, // python, cpp, java
    },

    sourceCode: {
      type: String,
      required: true,
    },

    input: {
      type: String,
      default: "",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
      index: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const LanguageCode = mongoose.model("LanguageCode", languageCodeSchema);

module.exports = LanguageCode;
