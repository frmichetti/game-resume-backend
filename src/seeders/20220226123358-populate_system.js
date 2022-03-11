'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('System', [{
      platform: 'PC',
      system: 'Origin',
      created_at: new Date(),
      updated_at: new Date()
    }, 
    {
      platform: 'PC',
      system: 'Steam',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      platform: 'PC',
      system: 'Ubisoft',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'Console',
      system: 'GameCube',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'Console',
      system: 'Wii',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'Console',
      system: 'WiiU',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - Wii',
      system: 'NES',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - Wii',
      system: 'Nintendo 64',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - Wii',
      system: 'Mega Drive',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - Wii',
      system: 'Super Nintendo',
      created_at: new Date(),
      updated_at: new Date()
     },     
     {
      platform: 'VirtualConsole - WiiU',
      system: 'NES',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - WiiU',
      system: 'Nintendo 64',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - WiiU',
      system: 'Mega Drive',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - WiiU',
      system: 'Super Nintendo',
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      platform: 'VirtualConsole - WiiU',
      system: 'Wii',
      created_at: new Date(),
      updated_at: new Date()
     }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('System', null, {});
  }
};
