const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,

    maxlength: [40, "please enter shorter name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please enter an email id"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "enter a valid email"],
  },
  photo: String,

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  active: {
    type: Boolean,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
