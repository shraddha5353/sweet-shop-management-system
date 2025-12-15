const Sweet = require("../models/Sweet");

exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sweet = await Sweet.create({ name, category, price, quantity });
    res.status(201).json(sweet);
  } catch (err) {
    console.error(err); // <--- LOG THE ERROR
    res.status(500).json({ message: "Server error" });
  }
};


exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.searchSweets = async (req, res) => {
  try {
    const { query } = req.query; // search term from query string
    const sweets = await Sweet.find({
      name: { $regex: query, $options: "i" } // case-insensitive search
    });
    res.status(200).json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

