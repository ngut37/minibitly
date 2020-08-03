import express from 'express';
import mongoose from 'mongoose';
require('dotenv/config');

import { linkRouter } from './routers/link.router';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/links', linkRouter);

mongoose.connect(
    process.env.MONGO_DB!,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB.')
);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
