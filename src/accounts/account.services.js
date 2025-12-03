import { bankAccount } from "../models/bankaccount.js"

export const findBankAccount=async (id)=>{
    return await bankAccount.findOne({where:id})
}


export const createAccount= async (data)=>{
    return await bankAccount.create(data)
}