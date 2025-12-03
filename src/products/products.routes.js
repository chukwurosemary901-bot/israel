import { Router } from "express";
import * as productController from './products.controllers.js'
import {adminAuth, auth, staffAuth} from '../middleware/auth.js'
export const productRouter=Router();
productRouter.get('/:id', productController.getProductIdController),
productRouter.post( '/addproducts', auth, staffAuth, productController.addProductController)
productRouter.post( '', productController.allProductController)
productRouter.delete( '/deleteproducts/:id', auth, adminAuth, productController.deleteProductController)