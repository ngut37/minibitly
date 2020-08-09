import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { config } from './config/config';
import { linkRouter } from './routers/link.router';

const app = express();

app.use(bodyParser.json());

app.use('/links', linkRouter);

mongoose.connect(config.MONGO_DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(config.PORT, () =>
    console.log(`Server is listening on port: ${config.PORT}`)
);
