const express = require("express");
const Calculation = require("../models/Calculation");

const router = express.Router();

router.post("/evaluate", async (req, res) => {
  try {
    const { expression, result } = req.body;
    const calculation = new Calculation({ expression, result });
    await calculation.save();
    res.status(201).json({ message: "Calculation saved", calculation });
  } catch (error) {
    res.status(500).json({ message: "Error saving calculation", error });
  }
});

router.get("/history", async (req, res) => {
  try {
    const history = await Calculation.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
});

module.exports = router;
