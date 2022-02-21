'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Origin', [{
      app_id: null,
      title: 'Alice Madness Returns',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Burnout Paradise',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Crysis',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Crysis 2: Maximum Edition',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Crysis 3',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Crysis Warhead',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Dead Space 1',
      finished: true,
      finished_at: new Date('2021'),
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Dead Space 2',
      finished: true,
      finished_at: new Date('2021'),
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Dead Space 3',
      finished: true,
      finished_at: new Date('2021'),
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Fifa 18',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Kingdoms of Amalur Reckoning',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Need for Speed Hot Pursuit',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Need for Speed The Run',
      finished: true,
      finished_at: new Date('2021'),
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      app_id: null,
      title: 'Star Wars Batlefront 2',
      finished: false,
      finished_at: null,
      created_at: new Date(),
      updated_at: new Date()
     },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Origin', null, {});
  }
};
