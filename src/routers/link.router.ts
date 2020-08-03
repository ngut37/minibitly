import { Router } from 'express';
import { Links } from '../models/link.model';

export const linkRouter: Router = Router();

linkRouter.param('name', async (req: any, res, next, name: string) => {
    const link = await Links.findOne({ name });
    if (!link) {
        return res.status(404).send(`Link - ${name} - not found.`);
    }
    req.link = link;
    return next();
});

linkRouter.get('/:name', (req: any, res) => {
    return res.redirect(req.link.url);
});

linkRouter.post('/', async (req, res) => {
    let { name, url } = req.body;
    url = modifyUrl(url);
    const link = new Links();
    link.name = name;
    link.url = url;
    try {
        await link.save();
        return res.status(201).send(link);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

const modifyUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    } else {
        return 'http://' + url;
    }
};
