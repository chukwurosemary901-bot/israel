import dotenv from 'dotenv';
import { config } from './env.js';
dotenv.config();
export default {
    development: {
        username:config.DB.user,
        password: config.DB.password,
        database: config.DB.name,
        host: config.DB.host,
        dialect: "postgres",
    },
    test: {
        username:config.DB.user,
        password: config.DB.password,
        database: config.DB.name,
        host: config.DB.host,
        dialect: "postgres",
    },
    production: {
        username:config.DB.user,
        password: config.DB.password,
        database: config.DB.name,
        host: config.DB.host,
        dialect: "postgres",
    }
};










