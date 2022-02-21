'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ubisoft', [{
      app_id: null,
      title: 'Assassins Creed 4: Black Frag',
      finished: false,
      finished_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ubisoft', null, {});
  }
};
