import { Router } from "express";

import { Links, Paths } from "../../models";

export const getRouter: Router = Router();

getRouter.param('prefix', async (_, res, next, name: string) => {
  const path = await Paths.findOne({ name });
  if (!path) {
      return res.status(404).send(`Path - ${name} - not found.`);
  }
  return next();
});

getRouter.param('name', async (req: any, res, next, name: string) => {
  const link = await Links.findOne({ name });
  if (!link) {
      return res.status(404).send(`Link - ${name} - not found.`);
  }
  req.link = link;
  return next();
});

getRouter.get('/:prefix/:name', (req: any, res) => {
  return res.redirect(req.link.url);
});