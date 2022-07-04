const { Item } = require("../db/models");

exports.getItems = async (req, res, next) => {
  try {
    const itemsData = await Item.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(itemsData);
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  const foundItem = await Item.findByPk(req.params.itemId);
  try {
    if (foundItem.customerId !== req.user.id)
      throw {
        status: 401,
        message: "You can't delete an item that's not yours!",
      };
    await foundItem.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  const foundItem = await Item.findByPk(req.params.itemId);
  try {
    if (foundItem.customerId !== req.user.id)
      throw {
        status: 401,
        message: "You can't edit an item that's not yours",
      };
    if (req.file) {
      req.body.img = `http://${req.get("host")}/${req.file.path}`;
    }
    const updatedItem = await foundItem.update(req.body);
    res.status(201).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.img = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body.customerId = req.user.id;
    const newBook = await Item.create(req.body);
    res.status(200).json(newBook);
  } catch (error) {
    next(error);
  }
};

exports.fetchItemDetails = async (req, res, next) => {
  try {
    const foundItem = await Item.findByPk(req.params.itemId);
    res.status(200).json(foundItem);
  } catch (error) {
    next(error);
  }
};
