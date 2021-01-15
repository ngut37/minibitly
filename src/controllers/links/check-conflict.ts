import { Router } from "express";

import { Links, Paths } from "../../models";

export const checkConflictRouter: Router = Router();

type RequestBody = {
  path: string;
  name: string;
};

checkConflictRouter.post('/check', async (req, res) => {
  let { name, path } = req.body as RequestBody;

  try {
    // find path
    let targetPath = await Paths.findOne({ name: path }).populate('links.link');

    let links;

    if (targetPath) {

      const linksPromise = targetPath.links.map(async (link) => await Links.findById(link, { _id: 0, name: 1 }).lean());
      links = await Promise.all(linksPromise);

      if (links.map(linkName => linkName.name).includes(name)) {
        return res.status(409).send(`Link - ${name} - duplicate name.`);
      }
    }

    return res.sendStatus(200);

  } catch (e) {
    return res.status(500).send(e.message);
  }
});