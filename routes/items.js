const express = require("express");
const upload = require("../middleware/multer");
const {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  fetchItemDetails,
} = require("../controller/itemsController");
const passport = require("passport");

const router = express.Router();

router.get("/", getItems);

router.get("/:itemId", fetchItemDetails);

router.delete(
  "/:itemId/delete",
  passport.authenticate("jwt", { session: false }),
  deleteItem
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  createItem
);

router.put(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  upload.single("img"),
  updateItem
);

module.exports = router;
