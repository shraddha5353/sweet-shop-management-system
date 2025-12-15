const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const sweetController = require("../controllers/sweetController");
const {
  addSweet,
  getSweets
} = require("../controllers/sweetController");

router.post("/", auth, addSweet);
router.get("/", auth, getSweets);
router.get("/search", auth, sweetController.searchSweets);


module.exports = router;
