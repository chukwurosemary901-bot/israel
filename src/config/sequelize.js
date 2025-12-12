import { Sequelize } from 'sequelize';
import { config } from './env.js';

export const sequelize = new Sequelize(config.DB.name, config.DB.user, config.DB.password, {
  host: 'localhost',
  dialect: 'postgres' ,
  // logging: false
});

// const isProduction = config.nodeEnv === 'production';


// export const sequelize = new Sequelize(config.databaseURI, {
//   logging:false,
//   dialect:'postgres',
//   dialectOptions: {
//     ssl:isProduction? {
//       require:true,
//       rejectUnauthorized:false
//     }: false  //Disable ssl for local dev
//   }
// })
