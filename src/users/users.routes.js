import { Router } from "express";
import {auth, staffAuth} from '../middleware/auth.js'
import * as userController from "./users.controllers.js"
 export const userRouter=Router();

userRouter.get('/', auth ,userController.getUserIdController),
 userRouter.get('/allUser',auth, staffAuth, userController.allUserController),
 userRouter.post('/register', userController.registerUserController),
 userRouter.post('/login', userController.loginUserController),
 userRouter.patch('/edit/:id', userController.editUserController) 