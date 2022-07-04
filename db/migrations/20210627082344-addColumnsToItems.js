"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Items", "name", Sequelize.STRING, {});
    await queryInterface.addColumn("Items", "slug", Sequelize.STRING, {});
    await queryInterface.addColumn("Items", "price", Sequelize.INTEGER);
    await queryInterface.addColumn("Items", "img", Sequelize.STRING);
    await queryInterface.addColumn("Items", "description", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Items", "name");
    await queryInterface.removeColumn("Items", "price");
    await queryInterface.removeColumn("Items", "img");
    await queryInterface.removeColumn("Items", "slug");
    await queryInterface.removeColumn("Items", "description");
  },
};
