import jwt from 'jsonwebtoken'
import { config } from '../config/env.js';
export const aToken= (payload)=>{
    return jwt.sign (payload, config.access,  {expiresIn: '5m'})
}
export const rToken=(payload)=>{
    return jwt.sign({payload: payload}, config.refresh, {expiresIn: '59m'})
}