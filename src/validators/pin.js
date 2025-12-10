import joi from 'joi';

export const pinReg= joi.object({
    pin:joi.string().min(4).max(4),
    accountNumber:joi.string().required(),
   
})