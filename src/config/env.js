import dotenv from 'dotenv';
dotenv.config();

export const config=
    {
    port: process.env.PORT,
    access: process.env.ACCESS_SECRET,
    refresh:process.env.REFRESH_SECRET,

    DB:{
      name:process.env.NAME,   
      user:process.env.USER,
      password:process.env.PASS,
      host: process.env.HOST
    }
}