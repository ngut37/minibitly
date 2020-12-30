import { Router } from "express";

import { Paths } from "../../models";
import { generateSaltAndPassword } from "../../utils";

export const postRouter: Router = Router();

type RequestBody = {
  name: string;
  password: string;
};

postRouter.post('/', async (req, res) => {
  const { name, password } = req.body as RequestBody;

  try {
    const targetPath = await Paths.findOne({ name }, { _id: 1 }).lean();

    if (targetPath) {
      return res.status(409).send(`Path - ${name} - duplicate name.`);
    }

    const saltAndPassword = await generateSaltAndPassword(password);

    const path = new Paths();

    path.set({
      name,
      salt: saltAndPassword.salt,
      password: saltAndPassword.password,
    })
    await path.save();
    return res.status(201).send(path);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});