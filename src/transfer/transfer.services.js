
import { bankAccount } from "../models/bankaccount.js";
import { Transaction } from "../models/transaction.js";

export const findAccount= async (where, options={})=>{
    return await bankAccount.findOne({where, 
        ...options
     });
};

export const depositUpdate = async (balance, where, options={}) => {
    return await bankAccount.update(balance, {where,
        ...options
    })
}

export const createTransact = async (data, options={}) => {
    return await Transaction.create (data, 
        {...options}
    )
}

export const findAlert= async (id, category)=>{
    return await Transaction.findAll({where:id, category})
}
