import { User } from "../models/user.js";
import {bankAccount} from "../models/bankaccount.js"
import { where } from "sequelize";

export const findUserByEmail= async (email)=>{
    return await User.findOne({where: email });
};
export const findUserByAccount= async (email)=>{
    return await bankAccount.findOne({where: email });
};
export const findUserRole= async (role)=>{
    return await User.findAll({where: role });
};


export const signUpUser= async (data)=>{
    return await User.create(data);
}


export const edituserProfile = async (attribute, id) => {
    return await User.update(attribute, {where: id});
}
export const generatebankAccount= async (data)=>{
    return await bankAccount.create (data)
}

export const findAccount= async (acctNo)=>{
     return await bankAccount.findOne({where: acctNo });
};
export const findAl= async(id)=>{
    return await bankAccount.findAll( {where:id})
}

export const generateAccountNo=async ()=>{
    return Math.floor(Math.random() * 10000000000);
}































// export const users = [
// {
//   id: 1,
//   name: "Alice Johnson",
//   email: "alice.johnson@example.com",
//   age: 28,
//   role: "admin",
//   active: true,
//   password:12345678
// },
// {
//   id: 2,
//   name: "Ben Carter",
//   email: "ben.carter@example.com",
//   age: 35,
//   role: "editor",
//   active: true,
//    password:123245678
// },
// {
//   id: 3,
//   name: "Clara Kim",
//   email: "clara.kim@example.com",
//   age: 24,
//   role: "viewer",
//   active: false,
//    password:123435678
// },
// {
//   id: 4,
//   name: "David Lopez",
//   email: "david.lopez@example.com",
//   age: 42,
//   role: "editor",
//   active: true,
//    password:123455678
// },
// {
//   id: 5,
//   name: "Ella Brown",
//   email: "ella.brown@example.com",
//   age: 30,
//   role: "viewer",
//   active: false,
//    password:123645678
// }

// ];