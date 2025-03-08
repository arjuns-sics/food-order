import express from 'express';
export const ApiRouter = express.Router();

ApiRouter.get('/', (req, res) => {
    res.json({ message: 'Hello World! from /' });
});

ApiRouter.use('/data', (req, res) => {
    res.json({ message: 'Hello World!' });
});

