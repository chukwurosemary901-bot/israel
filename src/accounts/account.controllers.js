import { where } from "sequelize";
import { generatUniqueNumber } from '../utils/accountNumber.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js'
import { depositUpdate } from "../deposit/deposit.services.js";
import { bankAccount } from "../models/bankaccount.js";
import { findAccount, findAl, findUserByEmail } from "../users/users.services.js";

import { accountReg } from "../validators/account.js";
import { pinReg } from "../validators/pin.js";
import {  createAccount } from "./account.services.js";



export const bankAccountControllers= async(req, res)=>{
try {
        const loggedIn=req.user;

    if(!loggedIn) return res.status(404).json({error: `You have not logged in yet`})

    const{error, value}= accountReg.validate(req.body)

    if (error) return res.status(404).json({error: error.message})

    let{accountType, currency, accountNumber, userID, pin}= value;

    
    if(!["USD", "NGN", "EUR"].includes(currency)) return res.status(400).json({error:`Currency must be NGN, USD or EUR`})
       
        // currency= currency.toUpperCase()
        
 value.userID= loggedIn.id

 value.accountNumber= await generatUniqueNumber(10, bankAccount)




 value.pin= await hashPassword(pin)


let Account= await createAccount(value)

    return res.status(201).json({message:`Success`, Account})

} catch (error) {

    console.error({error: error.message})

    return res.json({error:`Internal Server Error`})
}
}




export const allbankAccounts= async(req, res)=>{
try {
        const loggedIn=req.user;

        if(!loggedIn) return res.status(404).json({error: `You have not logged in yet`})

    

        const allBank=  await findAl({userID:loggedIn.id})
        
        console.log(allBank);
        

    return res.status(201).json({message:`Success`, banks:allBank})

} catch (error) {

    console.error({error: error.message})

    return res.json({error:`Internal Server Error`})
}
}









export const updatebankPin= async(req, res) => {
   

try {
        let loggedIn = req.user
   
    if (!loggedIn)return res.status(404).json({error:`Oga you never login, you dey whyn`})

const{error, value}= pinReg.validate(req.body)
    
    if(error)return res.status(404).json({error:error.message})
  
        let {pin, accountNumber, OTP, email} = value

    // if(!pin &&  pin.length <4 )return res.status(404).json({tt:`Four digits pin required`})

    const checkNo = await findAccount({accountNumber})

    if(!checkNo)return res.status(401).json({error:`Account no does not exist`,})

         let Pin= await hashPassword(pin)

    if(loggedIn.id !== checkNo.userID)return res.status(494).json({error: `No be your account be this`})    
        
   const findEmail = await findUserByEmail({email})  
        
   if(!findEmail)return res.status(404).json({error:`Email does not exits`})
    
    // email  = req.email;

    // email= loggedemail
    
   
    
//    let  loggedOTP = req.OTP

//    OTP = loggedOTP

//       if(!OTP)return res.status(404).json({error:`Pls checkyour email for the OTP`})  

//         if(OTP != req.tp)return req.status(404).json({error:`Incorrect OTP`})
        

    const update= await depositUpdate({pin:Pin}, {accountNumber})

       let updatepin= await findAccount({accountNumber})

    return res.status(201).json({message: `Succeful transaction`, updatepin})
}
 catch (error) {
        console.error({error: error.message})

    return res.json({error:`Internal Server Error`})
}
}