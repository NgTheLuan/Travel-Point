import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";

import UsersRoute from "./routes/Users-route.js";
import ReservesRoute from "./routes/Reserve-route.js";
import HttpError from "./utils/Http-error.js";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept, Authorization "
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
});

app.use("/api/users", UsersRoute);
app.use("/api/reserve", ReservesRoute);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

const PORT = process.env.PORT || 5000;
mongoose.set("useFindAndModify", false);
mongoose
    .connect(process.env.MDB_CONNECT, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((err) => console.log(`${err} did not connect`));