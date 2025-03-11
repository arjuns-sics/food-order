import { zUser, UserModel } from '../models/user';
import express from 'express';

export const AuthRouter = express.Router();

AuthRouter.post('/register', async (req, res) => {
    const user = zUser.parse(req.body);
    const newUser = await UserModel.create(user);
    res.json({
        message: "User created successfully"
    });
});

AuthRouter.post('/login', async (req, res) => {
    const user = zUser.parse(req.body);
    const existingUser = await UserModel.findOne({ email: user.email });
    if (!existingUser) {
        return res.status(401).json({ message: "User not found" });
    }
    if (existingUser.password !== user.password) {
        return res.status(401).json({ message: "Incorrect password" });
    }
    res.json({
        message: "Login successful"
    });
});