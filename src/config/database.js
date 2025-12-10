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
//     test: {
//         username:config.DB.user,
//         password: config.DB.password,
//         database: config.DB.name,
//         host: config.DB.host,
//         dialect: "postgres",
//     },
    production: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        dialectOptions: {
            ssl:{
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};










