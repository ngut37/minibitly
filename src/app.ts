import express from 'express';
require('dotenv/config');

import { linkRouter } from './routers/link.router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/links', linkRouter);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
