 export const UniqueOTP= async (num) => {
    
    const min= Math.pow(10, num-1)
    const max= Math.pow(10, num) -1

        return OTP= Math.floor(Math.random()*(max-min +1)) + min;
        

 }