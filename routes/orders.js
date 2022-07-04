const express = require("express");
const passport = require("passport");
const { checkout, getMyOrders } = require("../controller/ordersController");
const router = express.Router();

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

router.get(
  "/myorders",
  passport.authenticate("jwt", { session: false }),
  getMyOrders
);
module.exports = router;
