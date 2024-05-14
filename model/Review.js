const { name } = require("ejs");
const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

module.exports = model("Review", reviewSchema);
