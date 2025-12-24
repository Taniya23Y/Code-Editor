const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can be max 500 characters"],
      default: "",
      index: true,
    },

    fullCode: {
      html: { type: String, default: "" },
      css: { type: String, default: "" },
      javascript: { type: String, default: "" },
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

    stars: [
      {
        type: Schema.Types.ObjectId,
        ref: "Auth",
      },
    ],

    starCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// auto-sync starCount
codeSchema.pre("save", async function () {
  this.starCount = this.stars.length;
});

const Code = mongoose.model("Code", codeSchema);
module.exports = Code;
