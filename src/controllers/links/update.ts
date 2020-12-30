import { Router } from "express";
import { ObjectId } from 'mongodb'

import { Links } from "../../models";
import { modifyUrl, validatePassword } from "../../utils";

export const updateRouter: Router = Router();

type RequestBody = {
  name: string;
  url: string;
  password: string;
};

type RequestParams = {
  id: string;
};

updateRouter.put('/:id', async (req, res) => {
  const { password, ...changes } = req.body as RequestBody;
  const { id } = req.params as RequestParams;

  try {
    const targetLink = await Links.findById(id).populate('path');
    if (!targetLink) {
      return res.status(404).send(`Link - ${id} - not found.`);
    }

    const { path } = targetLink;

    const isPasswordMatch = await validatePassword({ salt: path.salt, password }, path.password);
    if (!isPasswordMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    changes.url = modifyUrl(changes.url);

    await Links.findOneAndUpdate({ _id: new ObjectId(id) }, changes, {projection: {name: 1}} )

    return res.status(200).send(changes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});