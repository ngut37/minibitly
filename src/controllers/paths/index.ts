import { Router } from 'express';

import { getRouter } from './get-by-name';
import { postRouter } from './post';
import { deleteRouter } from './delete';

export const pathRouter: Router = Router();

pathRouter.use(getRouter);
pathRouter.use(postRouter);
pathRouter.use(deleteRouter);
