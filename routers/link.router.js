const express = require('express');

const linkRouter = express.Router();

const mockedDb = [
    {
        id: 'github',
        url: 'https://github.com/ngut37',
    },
    {
        id: 'linkedin',
        url: 'https://www.linkedin.com/in/trung-thu-nguyen-0103061b0/',
    },
];

linkRouter.param('id', (req, res, next, id) => {
    const { url } = mockedDb.find((element) => element.id === id);
    if (!url) {
        return res.status(404).send(`Sorry, link - ${id} - was not found.`);
    }
    req.redirectURL = url;
    next();
});

linkRouter.get('/hello', (req, res) => {
    res.send('Hello!');
});

linkRouter.get('/:id', (req, res) => {
    return res.redirect(req.redirectURL);
});

module.exports = linkRouter;
