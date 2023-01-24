require('dotenv').config();
import 'reflect-metadata';

import psqlDataSource from './data-source';
import { signupRouter } from './routes/signup';

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(signupRouter);
const port = process.env.PORT || 4000;

const main = async () => {
    await psqlDataSource.initialize();
    await startServer();
};

/** Start the server and listen for requests */
const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
};

main();
