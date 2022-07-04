const { Cart, Order, Item } = require("../db/models");

exports.checkout = async (req, res, next) => {
  const newOrder = await Order.create({ customerId: req.user.id });

  const cart = req.body.map((item) => ({
    ...item,
    orderId: newOrder.id,
    itemId: item.id,
  }));
  console.log(
    "🚀 ~ file: ordersController.js ~ line 9 ~ cart ~ newOrder",
    newOrder.toJSON()
  );
  await Cart.bulkCreate(cart);

  const finalOrder = {
    ...newOrder.toJSON(),
    items: req.body,
  };
  res.status(201).json(finalOrder);
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { customerId: req.user.id },
      include: { model: Item },
    });
    res.status(201).json(orders);
  } catch (error) {
    next(error);
  }
};
