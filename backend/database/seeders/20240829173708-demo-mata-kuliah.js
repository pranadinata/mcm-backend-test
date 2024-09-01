'use strict';
const {
  v4: uuidv4
} = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mata_kuliahs', [{
      id: uuidv4(),
      nama_matkul: 'Basis Data',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'Pemograman Berbasis Object',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'Algoritma Pemograman',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'Pengantar Manajemen',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'General English',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
