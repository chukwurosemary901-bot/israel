'use strict';
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class Transaction extends Model {}
Transaction.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
sourceAccount:{
        type: DataTypes.STRING,
        allowNull:true,
        references: {model:"bankAccounts", key:"id"},
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },

destinationAccount:{
  type: DataTypes.STRING,
        allowNull:true,
        references: {model:"bankAccounts", key:"id"},
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
},

      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: true
      },

      note: {
        type: DataTypes.STRING,
        allowNull: true
      },

      amount:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
      },

      status:{
        type: DataTypes.ENUM("processing", "success", "failed"),
        allowNull: false,
        defaultValue: "processing"
      },

      category:{
        type:DataTypes.ENUM("deposit", "withdrawal", "transfer", "subscription", "food", "groceries"),
        allowNull:true
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "Transactions",
  }
);














// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Transaction extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Transaction.init({
//     recipientEmail: DataTypes.STRING,
//     note: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Transaction',
//   });
//   return Transaction;
// };