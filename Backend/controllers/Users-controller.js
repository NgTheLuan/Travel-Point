import User from '../models/Users-model.js';
import { validationResult } from 'express-validator';
import HttpError from '../utils/Http-error.js';

export const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid data, please try again.', 401)
        );
    }
    const { name, email, password, image } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        const err = new HttpError('Something went wrong, please try again.', 500);
        return next(err);
    }

    if (existingUser) {
        const err = new HttpError('This email is existed, please log in or try another email.', 402);
        return next(err);
    }

    const createdUser = new User({
        name,
        email,
        password,
        image,
    })

    try {
        await createdUser.save();
    } catch (error) {
        const err = new HttpError('Sign up failed, please try again.', 500);
        return next(err);
    }
    res.status(201).json({ message: "Sign up successfully.", user: createdUser.toObject({ getters: true }) });
};

export const login = async (req, res, next) => {
    const { name, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ name: name })
    } catch (error) {
        const err = new HttpError('Can not find this user, please try again.', 401);
        return next(err);
    }

    if (!existingUser || existingUser.password !== password) {
        const err = new HttpError('Username or password is wrong, please try again.', 500);
        return next(err);
    }

    res.json({ message: 'Log in successfully.', user: existingUser.toObject({ getters: true }) });
};