import { Transaction } from "../models/transaction.js";
import { bankAccount } from "../models/bankaccount.js"

export const depositUpdate = async (balance, accountNumber) => {
    return await bankAccount.update(balance, {where: accountNumber})
}
export const findAccountNumber= async (email) => {
    return await bankAccount.findOne({where: email });
};

export const createTransact = async (data) => {
    return await Transaction.create (data)
}