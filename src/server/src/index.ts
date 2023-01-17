require('dotenv').config();
import 'reflect-metadata';
import psqlDataSource from './data-source';

import express from 'express';
import routes from './routes/routes';
const app = express();

app.use(routes);

const port = process.env.PORT || 4000;

const main = async () => {
    try {
        await initDb();
        await startServer();
    } catch (error) {
        console.log(error);
    }
};

const initDb = async () => {
    await psqlDataSource.initialize();
};

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
};

main();
