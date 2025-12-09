import joi from 'joi'


export const  accountReg= joi.object(
    {
        acountType:joi.string().required(),
        currency:joi.string(),
        pin:joi.string().required().min(4).max(4)
    }
)