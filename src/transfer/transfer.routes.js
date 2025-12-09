import { Router } from "express";
import * as transferController from './transfer.controllers.js'
import {auth} from '../middleware/auth.js'
export const transferRoute= Router();

transferRoute.post('/', auth, transferController.transferControllers )
transferRoute.get('/', auth, transferController.alertControllers )