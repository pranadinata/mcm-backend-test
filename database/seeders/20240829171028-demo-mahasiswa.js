'use strict';
const {
  v4: uuidv4
} = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mahasiswas', [{
        id: '1dd8afc7-42ea-4ba3-9087-95d93f18236f',
        nama_lengkap: 'Mahasiswa satu',
        nim: 120101,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'defb18a6-2ad0-4f9a-b5e0-127330549cc3',
        nama_lengkap: 'Mahasiswa dua',
        nim: 120102,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '0d06ca15-355a-4338-b357-c5d2e826939e',
        nama_lengkap: 'Mahasiswa tiga',
        nim: 120103,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '57c5f6e5-9351-4d6d-b638-46111f007b34',
        nama_lengkap: 'Mahasiswa empat',
        nim: 120104,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '17f8c847-188e-4aaf-91e7-8be4bb5132f8',
        nama_lengkap: 'Mahasiswa lima',
        nim: 120105,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6ecb0b58-0b16-4d5f-a96f-fd709a4fe849',
        nama_lengkap: 'Mahasiswa enam',
        nim: 120106,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '1b3552cc-11b9-4677-956c-26e6fab9a542',
        nama_lengkap: 'Mahasiswa tujuh',
        nim: 120107,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'dda42671-3685-49c5-92c5-c7c4ea5230cd',
        nama_lengkap: 'Mahasiswa delapan',
        nim: 120108,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e1ac12fb-2f0c-4eb3-95f8-009b7771d36a',
        nama_lengkap: 'Mahasiswa sembilan',
        nim: 120109,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'd7111b7a-0ea5-46e6-90ec-6bcaff58bd40',
        nama_lengkap: 'Mahasiswa sepuluh',
        nim: 120110,
        alamat: 'Jl. ABC No 80',
        semester: 2016,
        jurusan: 'Teknik Informatika',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {

  }
};