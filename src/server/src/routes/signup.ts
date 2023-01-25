import { newUser } from '../entities/Users';
import { Router } from 'express';
export const signupRouter = Router();

import asyncHandler from 'express-async-handler';
import { isEmailUnique, isUsernameUnique } from '../middleware/verification';

signupRouter.post(
    '/signup',
    asyncHandler(async (req, res): Promise<any> => {
        const usernameIsUnique = await isUsernameUnique(req.body.username);
        if (!usernameIsUnique) {
            return res
                .status(400)
                .send({ message: 'Username already exists!' });
        }

        const emailIsUnique = await isEmailUnique(req.body.email);
        if (!emailIsUnique) {
            return res.status(400).send({ message: 'Email already exists!' });
        }

        await newUser(req.body.email, req.body.username, req.body.password);
        return res.status(200).send({ message: 'User created successfully!' });
    })
);
