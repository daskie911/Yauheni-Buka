const { Schema, model } = require("mongoose");

// Create a schema for the contact model

const contactSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model("Contact", contactSchema);
