'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      username:{
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      password:{
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      char_count:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};
