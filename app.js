const express = require("express");
const cors = require("cors");
const passport = require("passport");

const items = require("./routes/items");
const users = require("./routes/users");
const orders = require("./routes/orders");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

// Midleware
app.use(cors());
app.use(express.json());

// Passport Setup
app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(localStrategy);

// Routes
app.use("/items", items);
app.use(users);
app.use(orders);

app.use("/media", express.static("media"));

app.use((req, res, next) => {
  res.status(404).json({ message: "page do not exist/ invalid url" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server Error" });
});

app.listen(8000);
