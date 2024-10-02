'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Test',
        lastName: 'Admin',
        email: 'demouser@demo.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Seedman',
        lastName: 'One',
        email: 'seedguy1@demo.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Seedman',
        lastName: 'Two',
        email: 'seedguy2@demo.com',
        hashedPassword: bcrypt.hashSync('password')
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
