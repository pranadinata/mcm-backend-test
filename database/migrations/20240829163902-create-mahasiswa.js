'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mahasiswas', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nama_lengkap: {
        type: Sequelize.STRING
      },
      nim: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      alamat: {
        type: Sequelize.TEXT
      },
      semester: {
        type: Sequelize.INTEGER
      },
      jurusan: {
        type: Sequelize.STRING
      },
      max_matkul: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mahasiswas');
  }
};