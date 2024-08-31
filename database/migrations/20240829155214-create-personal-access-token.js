'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('personal_access_tokens', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      tokenable_type: {
        type: Sequelize.STRING
      },
      tokenable_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      expires_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('personal_access_tokens');
  }
};