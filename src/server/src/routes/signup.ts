import { getUserByEmail, getUserByUsername, newUser } from '../entities/Users';
import { Router } from 'express';
export const signupRouter = Router();

/**
 * Create a new user account.
 */
signupRouter.post('/signup', async (req, res): Promise<void> => {
    await getUserByUsername(req.body.username).then((user) => {
        if (user) {
            res.status(400).send({
                message: 'Username is already in use.',
            });
            return;
        }
    });

    await getUserByEmail(req.body.email).then((user) => {
        if (user) {
            res.status(400).send({
                message: 'Email is already in use.',
            });
            return;
        }
    });

    await newUser(req.body.email, req.body.username, req.body.password);
});
