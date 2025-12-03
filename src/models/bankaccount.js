import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
export class bankAccount extends Model {}
bankAccount.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      userID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {model:"Users", key:"id"},
      },
      bankName:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Horizon"
      },
      accountNumber:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      acountType:{
        type: DataTypes.ENUM("savings", "checking"),
        allowNull: false
      },
      balance:{
        type: DataTypes.DECIMAL,
        allowNull: false,
      defaultValue: 0.00
    },
    currency:{
    type:DataTypes.STRING,
    defaultValue:"USD"
    },
  },
  {
    sequelize,
    modelName: "bankAccount",
    tableName: "bankAccounts",
  }
);





// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class bankAccount extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   bankAccount.init({
//     userID: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'bankAccount',
//   });
//   return bankAccount;
// };