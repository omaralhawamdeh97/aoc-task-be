"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Items", "customerId", Sequelize.INTEGER, {
      references: {
        model: {
          tableName: "Users",
          schema: "schema",
        },
        key: "id",
      },
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Items", "customerId");
  },
};
