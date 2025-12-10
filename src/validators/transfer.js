import joi from 'joi'

export const transferSchema= joi.object({
    // sourceAccount: joi.string().required(),
    // destinationAccount: joi.string().required(),
    amount: joi.number().required().min(10),
    note:joi.string(),
    sourceAccountNo:joi.string().required(),
    destinationAccountNo:joi.string().required(),
    pin:joi.string().required()

})