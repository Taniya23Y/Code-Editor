const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const authSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required!"],
      trim: true,
      minLength: [2, "first name must be in 2 letters"],
      index: true,
    },

    lastName: {
      type: String,
      required: [true, "last name is required!"],
      trim: true,
      minLength: [2, "last name must be in 2 letters"],
      index: true,
    },

    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can contain letters, numbers, and underscores only",
      ],
      index: true,
    },

    developerType: {
      type: String,
      required: [true, "Developer type is required!"],
      enum: [
        "Frontend Developer",
        "Backend Developer",
        "Full-Stack Developer",
        "Python Developer",
        "Java Developer",
        "Student / Beginner",
        "Developer",
        "Other",
      ],
    },

    email: {
      type: String,
      required: [true, "Please Enter Your Email!"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Please Enter Your Password!"],
      minlength: [6, "Password must be at least 6 characters"],
      trim: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      index: true,
    },

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    profilePic: String,

    lastLogin: Date,
  },
  { timestamps: true }
);

authSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

authSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
