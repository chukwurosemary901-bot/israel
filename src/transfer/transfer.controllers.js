import { createTransact, depositUpdate, findAlert } from "../transfer/transfer.services.js"
import { findAccount } from "../transfer/transfer.services.js"
import { transferSchema } from "../validators/transfer.js"
import { sequelize } from "../config/sequelize.js"
import { comparePassword } from "../../utils/bcrypt.js"
import { findAccountNumber } from "../deposit/deposit.services.js"
import { convertCurrency } from "../../utils/currency.converter.js"
export const transferControllers = async (req, res) => {
   
    const t = await sequelize.transaction()
   
   try {

            const loggedIn = req.user
            
            if (!loggedIn){
                await t.rollback();

                return res.status(404).json({error:`Kindly login to access this endpoint`})}

            const {error, value} = transferSchema.validate(req.body)

            if (error){

              await t.rollback()

                return res.status(401).json({error:error.message})
  
            } 
            const {sourceAccountNo, destinationAccountNo, amount , destinationAccount, sourceAccount, category, status, pin} = value
           
            
            let receiver = await findAccount(

                {accountNumber:destinationAccountNo},

                {transaction: t}
            )
            
            if (!receiver){

                await t.rollback();

               return res.status(401) .json({error:`Receipient account number does not exist`}) 
            } 
                
            let sender= await findAccount(
                {accountNumber:sourceAccountNo},

                {transaction: t}
            )

            if (!sender) {

                 await t.rollback();

                return res.status(401) .json({error:` Sender account number does not exist`}
            )}
             
        // if(pin.includes())/
        if (loggedIn.id != sender.userID ){
             
            await t.rollback();

            return res.status(401).json({error:`No be you get this  account`})
        }
            const isMatch = await comparePassword(pin, sender.pin)
                  
            if(!isMatch)return res.status(404).json({error:`pin is incorrect`})


              if(amount ==='string'){
                
                await t.rollback();
                
                return res.status(404).json({error:`Enter a numeric value`})
              }
                
            if(parseFloat(sender.balance) < parseFloat(amount)){
                
                await t.rollback();

                return res.status(404).json({error:`Insufficient fund, Your balance is ${sender.balance}`})
            }

           let senderbalance = parseFloat(sender.balance) - parseFloat(amount)

            if(sender.currency !== receiver.currency){
               
                amount= await convertCurrency(sender.currency, receiver.currency, amount)

            if(!amount)return res.status(404).json({error:`Error converting currency`})
            }

           let receiverbalance = parseFloat(receiver.balance) + parseFloat(amount)
           
           value.destinationAccount = receiver.id
          
           value.sourceAccount = sender.id
           
        
           value.status = "success"

           value.category = "transfer"
        // {// ANOTHER SWEET METHOD
        //    value.balance = senderbalance
        //    await depositUpdate(value, {accountNumber:sender.accountNumber}) }
       
           await depositUpdate({balance:senderbalance}, {accountNumber:sender.accountNumber}, {transaction:t})
           
           await depositUpdate({balance:receiverbalance} , {accountNumber:receiver.accountNumber}, {transaction:t})
           
           const Transfer= await createTransact(value, {transaction: t})

           await t.commit();

           
return res.status(201).json({message:`Successful transaction`, Transfer})
    }
     catch (error) {
       
        await t.rollback()

        console.error(`Error creating transfer :${error.message}`)

        return(`Internal Server Error`)
    }
}


// alert = ( ) => {

// }

export const alertControllers= async (req, res)=>{
try {
    
    const loggedIn = req.user

if (!loggedIn)return res.status(404).json({error:`You must be logged in to check alerts`})

const {accountNumber, category, destinationAccount}= req.body

const findAccount=  await findAccountNumber({accountNumber})

if(!findAccount)return res.status(404).json({error:`This account does no exists`})
         
category= "deposit"

destinationAccount= findAccount.id

const findAlert = await findAlert({destinationAccount, category})

return res.status(201).json({message:`Successful`, findAlert})

} catch (error) {
    console.error(`Error finding transaction ${error.message}`);
    
    return(`Internal Server Error`)
}
}
