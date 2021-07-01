const mongoose = require("mongoose");
const validator = require("validator");
const vendors = require("./vendorModel");
const slugify = require("slugify");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a tour must have a name"],
    unique: true,
    trim: true,

    maxlength: [40, "product name should not be more than 40 chars"],
  },
  category: {
    type: String,
    required: [true, "A product must have category"],
  },
  size: String,
  unit: String,
  color: String,
  price: {
    required: true,
    type: Number,
  },
  titles: {},
  description: {},
  inStock: {
    type: Boolean,
    required: true,
  },
  orderLimit: {
    type: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  latest: {
    type: Boolean,
    default: false,
  },
  onOffer: Boolean,
  subCategory: {
    type: String,
    required: [true, "A product must have a Brand"],
  },
  image: {
    type: [String],
  },
  discount: Number,
  discountedPrice: Number,
  options: {},
});
productsSchema.pre("save", function (next) {
  this.discountedPremium = this.price - this.price * (this.discount / 100);

  next();
});
const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
