'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 await queryInterface.changeColumn('Users', 'role',{
  type:Sequelize.STRING, 
  allowNull:true,
  defaultValue: 'user'
  })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.changeColumn('Users', 'role',{
  type:Sequelize.STRING, 
  allowNull:false
   })
  }
};
