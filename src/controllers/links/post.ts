import { Router } from "express";
import { config } from '../../config';

import { Links, Paths } from "../../models";
import { generateSaltAndPassword, modifyUrl, validatePassword } from "../../utils";

export const postRouter: Router = Router();

type RequestBody = {
  name: string;
  url: string;
  path: string;
  password: string;
};

postRouter.post('/', async (req, res) => {
  let { name, url, path, password } = req.body as RequestBody;

  try {
    // find path
    let targetPath = await Paths.findOne({ name: path }).populate('links.link');

    // create path if its non-existent
    if (!targetPath) {
      const saltAndPassword = await generateSaltAndPassword(password);

      const newPath = new Paths();
  
      newPath.set({
        name: path,
        salt: saltAndPassword.salt,
        password: saltAndPassword.password,
      })

      await newPath.save();
      targetPath = newPath;
    }

    const isPasswordMatch = await validatePassword({ salt: targetPath.salt, password }, targetPath.password);
    if (!isPasswordMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    const linksPromise = targetPath.links.map(async (link) => await Links.findById(link, { _id: 0, name: 1 }).lean());

    const links = await Promise.all(linksPromise);

    // forbid duplicate link name
    if (links.map(linkName => linkName.name).includes(name)) {
      return res.status(409).send(`Link - ${name} - duplicate name.`);
    }
    
    // generate link
    url = modifyUrl(url);
    const link = new Links();
    link.set({
      name,
      url,
      path: targetPath.id,
    })
    if (link) targetPath.links.push(link);
    await Promise.all([targetPath.save(), link.save()]);
    return res.status(201).send({
      link,
      url: `${config.URL}/${path}/${name}`
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});