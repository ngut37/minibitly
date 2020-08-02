import { Router, Response, NextFunction } from 'express';

export const linkRouter: Router = Router();

const mockedDb: Array<{
    id: string;
    url: string;
}> = [
    {
        id: 'github',
        url: 'https://github.com/ngut37',
    },
    {
        id: 'linkedin',
        url: 'https://www.linkedin.com/in/trung-thu-nguyen-0103061b0/',
    },
];

linkRouter.param('id', (req: any, res, next, id: string) => {
    const url = mockedDb.find((element) => element.id === id)?.url;
    if (!url) {
        return res.status(404).send(`Link - ${id} - not found.`);
    }
    req.redirectTo = url;
    next();
});

linkRouter.get('/:id', (req: any, res) => {
    return res.redirect(req.redirectTo);
});
