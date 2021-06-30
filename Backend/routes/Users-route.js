// const express = require("express");
// const { check } = require("express-validator");
// const router = express.Router();

// const usersController = require("../controllers/Users-controller");

// router.post(
//     "/signup",
//     [
//         check("name").not().isEmpty(),
//         check("email")
//             .normalizeEmail()
//             .isEmail(),
//         check("password").isLength({ min: 6 }),
//     ],
//     usersController.signup
// );
// router.post("/login", usersController.login);

// module.exports = router;

import express from "express";

import {
  signup,
  login,
} from "../controllers/Users-controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;