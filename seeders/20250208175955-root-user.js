'use strict';

const {hashPassword} = require('../utils/hash.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hashPassword('root');
    return queryInterface.bulkInsert('user', [
      {
        id: '505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7',
        username: 'root',
        email: 'root@gmail.com',
        password: hashedPassword,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};