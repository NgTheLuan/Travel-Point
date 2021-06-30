// const express = require("express");
// const Reserve = require("../controllers/Reserve-controller");
// const router = express.Router();

// router.post("/:uid", Reserve.bill);
// router.get("/user/:uid", Reserve.getBillByUserId);
// router.get("/:billId", Reserve.getBillByID);
// router.delete("/:billId", Reserve.deleteBill);

// module.exports = router;

import express from "express";

import {
    bill,
    getBillByUserId,
    getBillByID,
    deleteBill
} from "../controllers/Reserve-controller.js";

const router = express.Router();

router.post("/:uid", bill);
router.get("/user/:uid", getBillByUserId);
router.get("/:billId", getBillByID);
router.delete("/:billId", deleteBill);

export default router;