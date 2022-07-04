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

//get allItem
router.get("/", getItems);

//get itemDetails
router.get("/:itemId", fetchItemDetails);

//delete item
router.delete(
  "/:itemId/delete",
  passport.authenticate("jwt", { session: false }),
  deleteItem
);

//create item
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  upload.single("img"),
  createItem
);

//edit item
router.put(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  upload.single("img"),
  updateItem
);

module.exports = router;
