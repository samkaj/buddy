import { Users, getHashedPassword, getUserByEmail } from '../entities/Users';
import { Router } from 'express';
import { compare } from 'bcrypt';
import asyncHandler from 'express-async-handler';
export const loginRouter = Router();

loginRouter.post(
    '/login',
    asyncHandler(async (req, res): Promise<any> => {
        const user: Users | null = await getUserByEmail(req.body.email);
        if (!user) {
            return res.status(400).send({ message: 'Email does not exist' });
        }

        const correctPassword = await getHashedPassword(req.body.email);
        const passwordIsCorrect = await compare(
            req.body.password,
            correctPassword
        );

        if (!passwordIsCorrect) {
            return res.status(400).send({ message: 'Password is incorrect' });
        }

        req.session.userId = user.id;

        return res.status(200).send({ message: 'User logged in successfully' });
    })
);
