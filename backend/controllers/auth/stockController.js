// controllers/stockController.js
const Stock = require("../../models/stock.model");
const { createStockValidation } = require("../../services/createStockValidation");

// Create Stock
const createStock = async (req, res) => {
  const { error } = createStockValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json({ success: true, message: "Stock created successfully", stock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all stocks
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update stock
const updateStock = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStock) {
      return res.status(404).json({ success: false, message: "Stock not found" });
    }
    res.status(200).json({ success: true, message: "Stock updated successfully", updatedStock });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete stock
const deleteStock = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStock = await Stock.findByIdAndDelete(id);
    if (!deletedStock) {
      return res.status(404).json({ success: false, message: "Stock not found" });
    }
    res.status(200).json({ success: true, message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
};
