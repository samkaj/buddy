require('dotenv').config();
import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';

import psqlDataSource from './data-source';
import { loginRouter } from './routes/login';
import { signupRouter } from './routes/signup';

import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
declare module 'express-session' {
    interface Session {
        userId?: string;
    }
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const main = async () => {
    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        session({
            name: 'sid',
            store: new RedisStore({ client: redis, disableTouch: true }),
            saveUninitialized: false,
            secret: process.env.REDIS_SECRET ?? 'secret',
            resave: false,
            cookie: {
                httpOnly: true, // prevents client side JS from reading the cookie
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                secure: process.env.NODE_ENV === 'production', // cookie only works in https
                sameSite: 'lax', // protect from csrf
            },
        })
    );

    await psqlDataSource.initialize();
    app.use(routes);
    app.use(signupRouter);
    app.use(loginRouter);

    const port = process.env.PORT || 4000;
    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    }
};

main();

export default app;
