import joi from 'joi'

export const depositReg= joi.object({
    amount:joi.number().required().min(500),
    accountNumber:joi.string().required(),
    pin:joi.string().required().min(4).max(4)
})