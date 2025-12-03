'use strict';
const { allow } = require('joi');
const { DataTypes, UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique:true
      },

      sourceAccount:{
        type: Sequelize.STRING,
        allowNull:true,
        references: {model:"bankAccounts", key:"id"},
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },

destinationAccount:{
  type: Sequelize.STRING,
        allowNull:true,
        references: {model:"bankAccounts", key:"id"},
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
},

      recipientEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },

      note: {
        type: Sequelize.STRING,
        allowNull: true
      },
                                               
      amount:{                                                         
        type: Sequelize.DECIMAL,
        allowNull: false,
      
      },

      status:{
        type: Sequelize.ENUM("processing", "success", "failed"),
        allowNull: false,
        defaultValue: "processing"
      },

      category:{
        type:Sequelize.ENUM("deposit", "withdrawal", "transfer", "subscription", "food", "groceries"),
        allowNull:true
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
    await queryInterface.dropTable('Transactions');
  }
};