const mongoose = require('mongoose');

// Structure of a document (what fields it should have)
const teaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  caffeineLevel: { type: String, required: true },
  image: { type: String, required: false },
  type: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
});

// A model is created from a schema; what you use to interact with the database
module.exports = mongoose.model('tea', teaSchema);
