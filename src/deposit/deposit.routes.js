import { Router } from "express";
import * as depositController from './deposit.controllers.js'
import {auth} from '../middleware/auth.js'
export const depositRouter=Router();

depositRouter.post('/', auth,  depositController.depositController )