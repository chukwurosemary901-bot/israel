import { bankAccount } from "../models/bankaccount.js";
import { findAccount } from "../users/users.services.js";
import { depositReg } from "../validators/deposit.js";
import {  createTransact, depositUpdate } from "./deposit.services.js";
import { comparePassword } from "../../utils/bcrypt.js";

 export const depositController = async(req, res) => {
try {
    
const loggedIn= req.user;

if(!loggedIn) return res.status(401).json({error:`Kindly login to deposit your account`})

        const{error, value}=depositReg.validate(req.body)

        if (error) return res.status(404).json({error:error.message})

        let {amount, accountNumber, status, category, destinationAccount, pin} = value
        
        const check = await findAccount({accountNumber})
        // console.log({check:check});
        console.log(check);
        
        if(!check)return res.status(404).json({error:`Account does not exist`})

        if(loggedIn.id != check.userID )return res.json({error:`Ooops!!! You cannot acces this account number`})
            
        // if(check.accountNumber != accountNumber )return res.status(404).json({error:`You are cannot access this account number`})
        
        // const isPin= await findAccount({pin})

        const isAwait= await comparePassword(value.pin, check.pin)

        if(!isAwait) return res.status(400).json({error:`Incorrect pin`})

        const prevBalance= parseFloat(check.balance)
                
        let add=parseFloat(amount)
            
        let newBalance= prevBalance + add
                
        value.status= "success"

        value.destinationAccount= check.id;

        value.category= "deposit"

        let acctBalance = await depositUpdate({balance:newBalance}, {accountNumber}) 

        const Transaction= await createTransact(value)
        
 return res.status(201).json({message: `Successful deposit `, Transaction })

} catch (error) {
console.error(error.message);

return res.status(401).json({error:`Internal Server Error`})
}
 }