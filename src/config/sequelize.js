import { Sequelize } from 'sequelize';
import { config } from './env.js';

export const sequelize = new Sequelize(config.DB.name, config.DB.user, config.DB.password, {
  host: 'localhost',
  dialect: 'postgres' ,
  // logging: false
});