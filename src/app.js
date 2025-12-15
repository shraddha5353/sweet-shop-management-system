const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(express.json());
app.use("/api/test", require("./routes/protectedRoutes"));
app.use("/api/sweets", require("./routes/sweetRoutes"));



app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;
