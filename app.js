const express = require('express');
require('dotenv/config');

const linkRouter = require('./routers/link.router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/links', linkRouter);

app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
