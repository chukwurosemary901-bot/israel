import { sequelize } from "../config/sequelize.js";
import { User } from "./user.js";
import { bankAccount } from "./bankaccount.js";
import { Transaction } from "./transaction.js";
// ASSOCIATIONS 
// One User has many bank accounts

User.hasMany(bankAccount, {
  foreignKey: "userID",
  as: "accounts"
});

bankAccount.belongsTo(User, {
  foreignKey: "userID",
  as: "owner"
})

bankAccount.hasMany(Transaction,{
  foreignKey:"sourceAccount",
  as:"outgoing transactions"
})
bankAccount.hasMany(Transaction,{
  foreignKey:"destinationAccount",
  as:"incoming transactions"
})
Transaction.belongsTo(bankAccount,{
  foreignKey:"sourceAccount",
  as:"sender"
})
Transaction.belongsTo(bankAccount,{
  foreignKey:"destinationAccount",
  as:"receiver"             
})



export const initDB= async () => {
  try {
    await sequelize.authenticate();
    
      console.log('Connection has been established successfully.');
      // await sequelize.sync({})
      // console.log(`Database synced successfully`);
    
  } catch (error) {
    console.error(`Database connection error ${error}`)
  }
}
export {User, bankAccount, Transaction}


// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/database.js')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
