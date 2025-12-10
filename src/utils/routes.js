import {Router} from 'express';
import { userRouter } from '../users/users.routes.js' ;
import { productRouter } from '../products/products.routes.js'
import { accountRouter } from '../accounts/account.routes.js';
import { depositRouter } from '../deposit/deposit.routes.js';
import { transferRoute } from '../transfer/transfer.routes.js';
// import { emailRouter } from '../email/email.routes.js';

export const routes= Router();

routes.use('/users', userRouter );
routes.use('/account', accountRouter);
routes.use('/deposit', depositRouter)
routes.use('/products', productRouter);
routes.use('/transfer', transferRoute);
// routes.use('/email', emailRouter )