import joi from 'joi';
export const userReg = joi.object({
   
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8).max(10),
    accountType: joi.string().required(),
    role: joi.string().required(),
    pin:joi.string().min(4).max(4)
}); 