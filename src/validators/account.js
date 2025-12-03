import joi from 'joi'


export const  accountReg= joi.object(
    {
        acountType:joi.string().required(),
        currency:joi.string()
    }
)