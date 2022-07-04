const express = require("express");
const passport = require("passport");
const router = express.Router();
const { signup, signin } = require("../controller/usersController");

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);

module.exports = router;
