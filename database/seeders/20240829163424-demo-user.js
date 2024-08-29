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
        nim_id: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa1',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120101,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa2',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120102,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa3',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120103,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa4',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120104,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa5',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120105,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa6',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120106,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa7',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120107,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa8',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120108,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa9',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120109,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'mahasiswa10',
        password: '$2b$10$gcfcOHum/pWg1lKiOKe0huF6JEuOXmpDMusnTdWikK777Az3j85Z2',
        role_id: 2,
        nim_id: 120110,
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