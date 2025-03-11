import express from 'express';
import { db } from '../driver/db';
import { UserModel, type User } from '../models/user';
import { MenuRouter } from './menu';
import { AuthRouter } from './auth';
export const ApiRouter = express.Router();


ApiRouter.use('/menu', MenuRouter);
ApiRouter.use('/auth', AuthRouter);
ApiRouter.get('/', (req, res) => {
    res.json({ message: 'Hello World! from /' });
});