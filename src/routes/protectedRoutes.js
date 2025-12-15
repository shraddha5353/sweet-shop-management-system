const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/protected", auth, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    userId: req.user.id
  });
});

module.exports = router;
