import express from 'express';
import { db } from '../driver/db';
import { UserModel, type User } from '../models';
export const ApiRouter = express.Router();

ApiRouter.get('/', (req, res) => {
    res.json({ message: 'Hello World! from /' });
});

ApiRouter.get('/data', async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
});

ApiRouter.post('/data', async (req, res) => {
    const user: User = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        address: "123 Main St, Anytown, USA",
    };
    const newUser = await UserModel.create(user);
    res.json({
        message: "User created successfully"
    });
});