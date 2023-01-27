import { getUserByEmail, getUserByUsername, newUser } from '../entities/Users';
import { Router } from 'express';
export const signupRouter = Router();

import asyncHandler from 'express-async-handler';

signupRouter.post(
    '/signup',
    asyncHandler(async (req, res): Promise<any> => {
        const usernameIsUnique =
            (await getUserByUsername(req.body.username)) === null;
        if (!usernameIsUnique) {
            return res
                .status(400)
                .send({ message: 'Username already exists!' });
        }

        const emailIsUnique = (await getUserByEmail(req.body.email)) === null;
        if (!emailIsUnique) {
            return res.status(400).send({ message: 'Email already exists!' });
        }

        await newUser(req.body.email, req.body.username, req.body.password);
        return res.status(200).send({ message: 'User created successfully!' });
    })
);
