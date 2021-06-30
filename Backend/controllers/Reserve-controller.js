import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import HttpError from '../utils/Http-error.js';

import User from '../models/Users-model.js';
import RT from '../models/Reserve-model.js';

export const bill = async (req, res, next) => {
    console.log("success")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid data, please try again.', 400)
        );
    }
    const userId = req.params.uid;
    const { numberofguest, smoking, date } = req.body;

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        const err = new HttpError("Can not find user id.", 401);
        return next(err);
    }

    if (!user) {
        const err = new HttpError("Can not find this user.", 402);
        return next(err);
    }

    const createdBill = new RT({
        numberofguest,
        guestName: user.name,
        smoking,
        date,
        creator: userId,
    })

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdBill.save();
        user.bill.push(createdBill);
        await user.save({ sess: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again.", 500);
        return next(error);
    }
    res.json({ message: 'Reserve successfully.', bill: createdBill });
};

export const getBillByID = async (req, res, next) => {
    const billId = req.params.billId;

    let bill;
    try {
        bill = await RT.findById(billId);
    } catch {
        return res
            .status(400)
            .json({ errorMessage: "Some thing went wrong, please try again" });
    }

    if (!bill) {
        return res
            .status(401)
            .json({ errorMessage: "Can not find this bill, please try again" });
    }
    res.json({ bill: bill.toObject({ getters: true }) });
};

export const getBillByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithBills;
    try {
        userWithBills = await User.findById(userId).populate("bill");
    } catch {
        return res
            .status(400)
            .json({ errorMessage: "Some thing went wrong, please try again" });
    }

    if (!userWithBills || userWithBills.bill.length === 0) {
        return res.status(401).json({
            errorMessage: "Can not find any bills with this user, please try again",
        });
    }
    res.json({
        bill: userWithBills.bill.map((bill) => bill.toObject({ getters: true })),
    });
};

export const deleteBill = async (req, res, next) => {
    const billId = req.params.billId;

    let bill;
    try {
        bill = await RT.findById(billId).populate("creator")
    } catch {
        return res
            .status(400)
            .json({ errorMessage: "Some thing went wrong, please try again." });
    }

    if (!bill) {
        return res
            .status(401)
            .json({ errorMessage: "Can not find this bill, please try again." });
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await bill.remove({ session: sess });
        bill.creator.bill.pull(bill);
        await bill.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch {
        return res
            .status(402)
            .json({ errorMessage: "Can not delete this bill, please try again." });
    }
    res.status(500).json({ message: "Deleted." });
};