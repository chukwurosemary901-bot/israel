import { generatUniqueNumber } from "../../utils/accountNumber.js";
import { bankAccount } from "../models/bankaccount.js";

import { accountReg } from "../validators/account.js";
import {  createAccount } from "./account.services.js";



export const bankAccountControllers= async(req, res)=>{
try {
        const loggedIn=req.user;

    if(!loggedIn) return res.status(404).json({error: `You have not logged in yet`})

const{error, value}= accountReg.validate(req.body)

    if (error) return res.status(404).json({error: error.message})

    let{accountType, currency, accountNumber, userID}= value

 value.userID= loggedIn.id

 value.accountNumber= await generatUniqueNumber(10, bankAccount)

let Account= await createAccount(value)

    return res.status(201).json({message:`Success`, Account})
} catch (error) {
    console.error({error: error.message})
    return res.json({error:`Internal Server Error`})
}



}
