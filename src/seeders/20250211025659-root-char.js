'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('char', [
      {
        id: '9441536d-c7f6-4e30-82f3-629d44f2c117',
        userid: '505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7',
        charname: 'rootchar',
        face_type: 'Sad',
        head_type: 'Triangle',
        accessory_type: 'Glasses',
        item_type: 'Cane',
        created_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('char', null, {});
  }
};
