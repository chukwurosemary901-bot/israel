import {Router} from 'express';
import { userRouter } from '../src/users/users.routes.js';
import { productRouter } from '../src/products/products.routes.js'
import { accountRouter } from '../src/accounts/account.routes.js';
import { depositRouter } from '../src/deposit/deposit.routes.js';

export const routes= Router();

routes.use('/users', userRouter );
routes.use('/account', accountRouter);
routes.use('/deposit', depositRouter)
routes.use('/products', productRouter)