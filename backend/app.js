const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const app = express();
const connectToDb = require("./db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const { cookie } = require("express-validator");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);

module.exports = app;
