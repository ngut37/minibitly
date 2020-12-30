import { Router } from "express";

import { Links } from "../../models";
import { validatePassword } from "../../utils";

export const deleteRouter: Router = Router();

type RequestBody = {
  password: string;
};

type RequestParams = {
  id: string;
};

deleteRouter.delete('/:id', async (req, res) => {
  const { password } = req.body as RequestBody;
  const { id } = req.params as RequestParams;

  try {
    const targetLink = await Links.findById(id).populate({ path: 'path', populate: 'links.link' });
    if (!targetLink) {
      return res.status(404).send(`Link - ${id} - not found.`);
    }
    const { path } = targetLink;
    const isPasswordMatch = await validatePassword({ salt: path.salt, password }, path.password);

    if (!isPasswordMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    path.links = path.links.filter(link => link.toString() !== targetLink.id);

    await path.save();
    targetLink.delete();
    return res.sendStatus(204);

  } catch (e) {
    return res.status(500).send(e.message);
  }
});