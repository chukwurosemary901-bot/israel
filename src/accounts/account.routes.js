import { Router } from "express"
import {auth} from '../middleware/auth.js'
import * as accountController from './account.controllers.js'

export const accountRouter= Router()
 
accountRouter.post('/', auth, accountController.bankAccountControllers)
accountRouter.get('/', auth, accountController.allbankAccounts)
accountRouter.patch('/',auth, accountController.updatebankPin)