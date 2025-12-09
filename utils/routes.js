import {Router} from 'express';
import { userRouter } from '../src/users/users.routes.js';
import { productRouter } from '../src/products/products.routes.js'
import { accountRouter } from '../src/accounts/account.routes.js';
import { depositRouter } from '../src/deposit/deposit.routes.js';
import { transferRoute } from '../src/transfer/transfer.routes.js';
import { emailRouter } from '../src/email/email.routes.js';

export const routes= Router();

routes.use('/users', userRouter );
routes.use('/account', accountRouter);
routes.use('/deposit', depositRouter)
routes.use('/products', productRouter);
routes.use('/transfer', transferRoute);
routes.use('/email', emailRouter )