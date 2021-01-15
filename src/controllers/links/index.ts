import { Router } from 'express';

import { postRouter } from './post';
import { updateRouter } from './update';
import { deleteRouter } from './delete';
import { checkConflictRouter } from './check-conflict';

export const linkRouter: Router = Router();

linkRouter.use(postRouter);
linkRouter.use(updateRouter);
linkRouter.use(deleteRouter);
linkRouter.use(checkConflictRouter);
