import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);


app.listen(5000, () => {
    mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/foodie")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error.reason));
});

