import { Router } from "express";

import { Links, Paths } from "../../models";
import { validatePassword } from "../../utils";

export const deleteRouter: Router = Router();

type RequestBody = {
  password: string;
};

type RequestParams = {
  name: string;
};

deleteRouter.delete('/:name', async (req, res) => {
  const { password } = req.body as RequestBody;
  const { name } = req.params as RequestParams;

  try {
    const path = await Paths.findOne({ name });
    if (!path) {
      return res.status(404).send(`Path - ${name} - not found.`);
    }

    const isPasswordMatch = await validatePassword({ salt: path.salt, password }, path.password);

    if (!isPasswordMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    // delete path (cascade links)
    path.links.forEach(async (link) => {
      await Links.findOneAndDelete({ _id: link })
    })
    path.delete();
    return res.sendStatus(204);

  } catch (e) {
    return res.status(500).send(e.message);
  }
});