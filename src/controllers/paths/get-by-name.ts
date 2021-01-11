import { Router } from "express";

import { Links, Paths } from "../../models";
import { validatePassword } from "../../utils";

export const getRouter: Router = Router();

type RequestBody = {
  password: string;
};

type RequestParams = {
  name: string;
};

getRouter.post('/:name', async (req, res) => {
  const { password } = req.body as RequestBody;
  const { name } = req.params as RequestParams;

  try {
    const path = await Paths.findOne({ name }).populate('links.link');
    if (!path) {
      return res.status(404).send(`Path - ${name} - not found.`);
    }

    const isPasswordMatch = await validatePassword({ salt: path.salt, password }, path.password);

    if (isPasswordMatch) {

      const linksPromise = path.links.map(async (link) => await Links.findById(link, { name: 1, url: 1 }).lean());

      const links = await Promise.all(linksPromise);

      const resultPath = {
        name: path.name,
        links,
      }

      res.status(200).send(resultPath);
    } else {
      return res.status(401).send('Invalid credentials.');
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
});