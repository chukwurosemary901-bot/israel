
import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';
import  { productReg } from './validators/product.js';
import { auth, staffAuth } from './middleware/auth.js';
import { decode } from 'jsonwebtoken';
import { sequelize } from './config/sequelize.js';
import { initDB } from './models/index.js';
import jwt from 'jsonwebtoken'
import { routes } from '../utils/routes.js';
import { aToken } from './tokens/jwt.js';
import { rToken } from './tokens/jwt.js';

const app=express();

const router= Router()

app.use(express.json());
app.use(router);
app.use(routes)



// // GETTING ALL USERS
// router.get('users/', (req, res)=>{

// })


// // GETTING A PARTICULA USER WITH ID
// router.get('/users/', (req, res)=>{

// });


// // REGISTRATION
// router.post('/users/reg',(req, res)=>{

//   // grab data
//   const{id, name, email, age ,role, active, password}=req.body

//   // destructure the data
//   if(!id){return res.status(404).json({error:`pls fill out id fields`})}
//   if(!name){return res.status(404).json({error:`pls fill out name fields`})}
//   if(!age){return res.status(404).json({error:`pls fill out age fields`})}

//   // check if email exists
//   if(email){   const Useremail=users.find((user)=>user.email === email)
//     if(Useremail){return res.status(404).json({error:`email already exists`})}}
 
  
//   users.push({id, name, email, age ,role, active, password})
//   return res.status(201).json({message:"Successfully registered", users })

// });


// // VALIDATED REGISTRATION
// router.post('/users/register', async (req, res)=>{
//   });
 

// // let refreshTokens=[]

router.post('/token', (req, res)=>{
    const{refreshToken}=req.body
    if(!refreshToken)return res.status(401).json({error:'no token'})
  
        jwt.verify(refreshToken, config.refresh, (err, decoded)=>{
      if(err)return res.status(403).json({error:`Token has expired`})
        const accessToken=aToken(decoded.id, decoded.name )
      return res.status(201).json({accessToken})
        })
})

// // LOGIN
// router.post('/users/login', async (req, res)=>{
  
// });

// // EDITING A USERS DETAILS
// router.patch('/users/edit/:id', (req, res)=>{

// })








// //     // GETTING ALL PRODUCTS
// //         router.get('/products', (req, res)=>{
// // return res.status(201).json({message:'All products', products})
// //     })


// // GETTING A PRDUCT
// router.get('/products', (req, res)=>{
 
  
// })


// // ADDING PRODUCTS
// router.post('/products', auth, staffAuth,(req, res)=>{

// });

app.listen(config.port, async ()=>{ 
try {
await initDB()
      console.log(`server running on http://localhost:${config.port}`);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

});