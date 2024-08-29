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
      max_siswa: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'Pemograman Berbasis Object',
      max_siswa: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'Algoritma Pemograman',
      max_siswa: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'Pengantar Manajemen',
      max_siswa: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nama_matkul: 'General English',
      max_siswa: false,
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
