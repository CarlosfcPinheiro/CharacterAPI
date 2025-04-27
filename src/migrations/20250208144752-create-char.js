'use strict';

// Creating ENUMs
const FACE_ENUM = ['Sad', 'Happy', 'Angry', 'Neutral'];
const HEAD_ENUM = ['Triangle', 'Square', 'Circle'];
const ACCESSORY_ENUM = ['Glasses', 'Moustache', 'Hat'];
const ITEM_ENUM = ['Cane', 'Staff', 'Paper'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('char', {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userid:{
        type: Sequelize.UUID,
        allowNull: false,
      },
      charname:{
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      face_type:{
        type: Sequelize.ENUM,
        values: FACE_ENUM,
        allowNull: false,
      },
      head_type:{
        type: Sequelize.ENUM,
        values: HEAD_ENUM,
        allowNull: false,
      },
      accessory_type:{
        type: Sequelize.ENUM,
        values: ACCESSORY_ENUM,
        allowNull: false,
      },
      item_type:{
        type: Sequelize.ENUM,
        values: ITEM_ENUM,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('char');
  }
};
