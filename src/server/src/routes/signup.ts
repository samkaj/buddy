import { getUserByEmail, getUserByUsername, newUser } from '../entities/Users';
import { Router } from 'express';
export const signupRouter = Router();

import asyncHandler from 'express-async-handler';

signupRouter.post(
    '/signup',
    asyncHandler(async (req, res): Promise<any> => {
        const user = await getUserByUsername(req.body.username);
        if (user) {
            return res.status(400).send({
                message: 'Username is already in use.',
            });
        }
        const userByEmail = await getUserByEmail(req.body.email);
        if (userByEmail) {
            return res.status(400).send({
                message: 'Email is already in use.',
            });
        }
        await newUser(req.body.email, req.body.username, req.body.password);
        return res.status(200).send({ message: 'User created successfully!' });
    })
);
