const mongoose = require("mongoose");
const validator = require("validator");
const vendorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [40, "please enter shorter name"],
    unique: true,
  },

  address: {
    type: String,
    maxlength: [40, "please enter shorter name"],
    required: true,
  },
  photo: String,
  opens: Number,
  closes: Number,
  category: String,
  description: String,

});
const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
