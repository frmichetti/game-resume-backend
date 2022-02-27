'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ubisoft', [{
      app_id: 'ACBF4',
      title: 'Assassins Creed 4: Black Frag',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ubisoft', null, {});
  }
};
