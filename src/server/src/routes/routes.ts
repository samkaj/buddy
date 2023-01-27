import express from 'express';
const router = express.Router();

router.get('/', (_, res) => {
    res.send(
        'Welcome to the buddy API. Available routes are /signup and /login.'
    );
});

export default router;
