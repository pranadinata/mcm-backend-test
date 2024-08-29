'use strict';
const {
  v4: uuidv4
} = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mahasiswas', [{
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 1',
        nim: 120101,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 2',
        nim: 120102,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 3',
        nim: 120103,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 4',
        nim: 120104,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 5',
        nim: 120105,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 6',
        nim: 120106,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 7',
        nim: 120107,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 8',
        nim: 120108,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 9',
        nim: 120109,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        nama_lengkap: 'Mahasiswa 10',
        nim: 120110,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        max_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {

  }
};