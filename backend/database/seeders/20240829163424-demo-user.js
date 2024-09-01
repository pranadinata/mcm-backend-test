'use strict';
const {
  v4: uuidv4
} = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
        id: uuidv4(),
        username: 'admin',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 1,
        mahasiswa_id: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa1',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: '1dd8afc7-42ea-4ba3-9087-95d93f18236f',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa2',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: 'defb18a6-2ad0-4f9a-b5e0-127330549cc3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa3',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: '0d06ca15-355a-4338-b357-c5d2e826939e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa4',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: '57c5f6e5-9351-4d6d-b638-46111f007b34',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa5',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: '17f8c847-188e-4aaf-91e7-8be4bb5132f8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa6',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: '6ecb0b58-0b16-4d5f-a96f-fd709a4fe849',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa7',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: '1b3552cc-11b9-4677-956c-26e6fab9a542',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa8',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: 'dda42671-3685-49c5-92c5-c7c4ea5230cd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa9',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: 'e1ac12fb-2f0c-4eb3-95f8-009b7771d36a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa10',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        mahasiswa_id: 'd7111b7a-0ea5-46e6-90ec-6bcaff58bd40',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};