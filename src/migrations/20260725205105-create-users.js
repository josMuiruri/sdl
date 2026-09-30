'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS citext;');

    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.CITEXT,
        allowNull: true,
        unique: true
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // passwordConfirm: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
