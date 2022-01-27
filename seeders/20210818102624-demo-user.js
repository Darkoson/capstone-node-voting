'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'p.q.andy.ashong@gmail.com',
      password: 'e1687253f2e388edcc8e40d6ef1a68ffe644b8a7451eac113d93dbfa492a9d17',
      createdAt: new Date(),
      updatedAt: new Date()},

      {email: 'ckoomson75@gmail.com',
      password:'c8dbb71b943b7b42a4523efa25201a86ca7545a34a247d5ffa454230fa8075ee',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
