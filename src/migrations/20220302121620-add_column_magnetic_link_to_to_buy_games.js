'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // logic for transforming into the new state
    await queryInterface.addColumn(
      'ToBuy',
      'magnetic_link',
     Sequelize.TEXT
    );
  },

  async down (queryInterface, Sequelize) {
     // logic for reverting the changes
     return queryInterface.removeColumn(
      'ToBuy',
      'magnetic_link'
    );
  }
};
