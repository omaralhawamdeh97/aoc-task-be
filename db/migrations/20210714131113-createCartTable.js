"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Carts", {
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Orders",
          },
          key: "id",
        },
        allowNull: false,
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Items",
          },
          key: "id",
        },
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaltValue: 1,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Carts");
  },
};
