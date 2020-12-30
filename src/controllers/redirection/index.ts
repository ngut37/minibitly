import { Router } from 'express';

import { getRouter } from './get';

export const redirectRouter: Router = Router();

redirectRouter.use(getRouter);
