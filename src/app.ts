import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { config } from './config/config';
import { linkRouter, pathRouter, redirectRouter } from './controllers';

const app = express();

app.use(bodyParser.json());

app.use('/paths', pathRouter);
app.use('/links', linkRouter);
app.use('/', redirectRouter);

mongoose.connect(config.MONGO_DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);

app.listen(config.PORT, () =>
    console.log(`Server is listening on port: ${config.PORT}`)
);
