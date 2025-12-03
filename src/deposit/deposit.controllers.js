import { bankAccount } from "../models/bankaccount.js";
import { findAccount } from "../users/users.services.js";
import { depositReg } from "../validators/deposit.js";
import {  createTransact, depositUpdate } from "./deposit.services.js";

 export const depositController = async(req, res) => {
try {
    
const loggedIn= req.user;

if(!loggedIn) return res.status(401).json({error:`Kindly login to deposit your account`})

        const{error, value}=depositReg.validate(req.body)

        if (error) return res.status(404).json({error:error.message})

        let {amount, accountNumber, status, category, destinationAccount}= value
        
        const check= await findAccount({accountNumber})
        // console.log({check:check});
        
        if(!check)return res.status(404).json({error:`Account does not exist`})
            
        if(check.accountNumber != accountNumber )return res.status(404).json({error:`You are cannot access this account number`})
                
        const prevBalance= parseFloat(check.balance)
                
        let add=parseFloat(amount)
                
        let newBalance= prevBalance + add
                
        value.status= "success"

        value.destinationAccount= check.id;

        value.category= "deposit"

        let acctBalance = await depositUpdate({balance:newBalance}, {accountNumber}) 

        const Transaction= await createTransact(value)
        
 return res.status(201).json({message: `Successful deposit`, Transaction })

} catch (error) {
console.error(error.message);

return res.status(401).json({error:`Internal Server Error`})
}
 }