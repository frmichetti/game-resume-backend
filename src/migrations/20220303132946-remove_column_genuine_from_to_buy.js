'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.removeColumn(
      'ToBuy',
      'genuine'
    );
    
  },

  async down (queryInterface, Sequelize) {
     // logic for reverting the changes
     await queryInterface.addColumn(
      'ToBuy',
      'genuine',
     Sequelize.BOOLEAN
    );
  }
};
