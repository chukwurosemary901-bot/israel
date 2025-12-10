// import { UniqueOTP } from "./email.services.js"

// export const emailControllers= async (req, res) => {
//     try {
        
        
//         let {email}=req.params;

//          if (email = req.email){
            
//             let  OTP= await UniqueOTP(4) 
            
        
//             OTP = req.OTP
//             return res.status(201).json({message:`Your OTP is `, OTP })
//          }
            
            
            
            
//     } catch (error) {
//              console.error({error: ` Error giving out otp, ${error.message}`})

//     return res.json({error:`Internal Server Error`})
//     }
// }