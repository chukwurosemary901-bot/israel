// import { users } from "./users.services.js";
import { generatUniqueNumber } from "../utils/accountNumber.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { createAccount } from "../accounts/account.services.js";
import { bankAccount } from "../models/bankaccount.js";
import { User } from "../models/user.js";
import { aToken, rToken } from "../tokens/jwt.js";
import { userReg } from "../validators/users.js";
import { edituserProfile,  findAccount,  findUserByEmail, signUpUser } from "./users.services.js";




// GETTING ALL USERS

export const allUserController= async (req, res)=>{
try {
    const allUsers=await User.findAll({User})
    return res.status(201).json({message: `Success`, allUsers });
} catch (error) {
         console.log("Error signing up user", error);
        return res.status(500).json({error: "Internal Server Error"});
}
}


// VALIDATED REGISTRATION
export const registerUserController= async (req, res)=>{
    try {
         // validate data from frontend 
          const {error, value} = userReg.validate(req.body)
        //  if there is an error from he frontened
         if(error) {return res.status(404).json({error:error.message})}
        
        //  destructure the data from frontend
        let{ firstName, lastName, email, password, accountType, pin}=value
let exist=true
        // check if email exists
        //   const emailExist=users.find((user)=>user.email === email)
        //   if(emailExist){return res.status(404).json({error:`email already exists`})}
        
        let user= await findUserByEmail({email:value.email});
        
        exist = !user
        
        console.log(exist);
        // return error if user is found
        if (user) return res.status(404).json({error:`User already exists`});
        
        // encrypt password
        value.password = await hashPassword(password)

         const pinn =  await hashPassword(pin)

        user = await signUpUser(value)
let accountNumber= await generatUniqueNumber(10, bankAccount);

const BankAccount= await createAccount({userID: user.id, accountNumber, acountType: accountType, pin:pinn})
        // let accountNumber= await generateAccountNo()
        // let Account= await findAccount(accountNumber)


        // let bankAccount= await generatebankAccount({userID:user.id, accountType, accountNumber})
        return res.status(201).json({message:`Successfully registered` ,user: user.toJSON(), bank: BankAccount.toJSON()});
    } catch (error) {
        console.log("Error signing up user", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}


//  LOGIN
export const loginUserController= async (req, res )=>{
    try {
        // grab data from frontend
       
        const{email, password} =  req.body
         
        if(!email ) return res.status(202).json({error:'pls fill in details correctly'})
         
            // check if user exists
        
            //   const Usersemail=users.find((user)=>user.email===email)
        
            //   if(!Usersemail){return res.status(404).json({error:'Wrong email'})}
      
         let user = await findUserByEmail({email:email});

        if(!user) return res.status(404).json({error:`Email does not exits`})
        
            // check users password
        
        const passmatch= await comparePassword(password, user.password)
        
        if(!passmatch) return res.status(400).json({error:'Invalid Credentials'})
        
        const id= user.id
        // const role=user.role

        const accessToken= aToken({id})
        // const refreshToken=rToken({id})
        // refreshTokens.push(tokens)

return res.status(201).json({message:'You have successfully logged in', user, accessToken})
} catch (error) {
    console.log("Error logging in user", error);
    return res.status(500).json({error: "Internal Server Error"});
    }

    }


// // GETTING A USERS BT ID
export const getUserIdController= async(req, res)=>{
    try {
          // get id from frontend
//           const loggedIn =req.user
          
// console.log({loggedIn:loggedIn});

    const idExists= await findUserByEmail({id:loggedIn.id})
    if(!idExists){return res.status(404).json({error:`Id not found`})}
return res.status(200).json({idExists})

    } catch (error) {
           console.log("Error gettung userid user", error);
    return res.status(500).json({error: "Internal Server Error"});
    }
}

// // EDITING A USERS DETAILS
export const editUserController= async(req, res)=>{
    try {
          const{id}=req.params;
          const{firstName, lastName}=req.body;
  if(!id){
    res.status(404).json({error:'pls fill in details'})
  }
  // Check if user with that id exist
  
    let user= await findUserByEmail({id});
console.log({old:user});

    
    if(!user) return res.status(400).json({error:'no user withthid id'})
        
        await edituserProfile(req.body, {id});

        user = await findUserByEmail({id});
        console.log({new:user});
        

  return res.status(201).json({message:'Success', user})
    } catch (error) {
           console.log("Error editing user", error);
    return res.status(500).json({error: "Internal Server Error"});  
    }
}