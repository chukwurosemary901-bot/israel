import * as EmailController from './email.controllers.js'
import { Router } from 'express';
export const emailRouter= Router();

emailRouter.get('/:email', EmailController.emailControllers )