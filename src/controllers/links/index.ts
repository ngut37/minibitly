import { Router } from 'express';

import { postRouter } from './post';
import { updateRouter } from './update';
import { deleteRouter } from './delete';

export const linkRouter: Router = Router();

linkRouter.use(postRouter);
linkRouter.use(updateRouter);
linkRouter.use(deleteRouter);
