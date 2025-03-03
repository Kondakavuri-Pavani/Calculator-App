const mongoose = require("mongoose");

const CalculatorSchema = new mongoose.Schema({
  expression: String,
  result: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Calculator", CalculatorSchema);
