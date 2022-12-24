import express from "express";
import dotenv from "dotenv";
import userRouter from "./Routers/userSchema.route.js";
import cors from "cors";
import bodyParser from "body-parser";
import mysql2 from "mysql2";
import'./Routers/userSchema.route.js';

import db from './config/db.config.js';

const connection = mysql2.createConnection({
    host: 'localhost',
    user:'root',
    password:'admin',//password of your mysql db
    database:'kullanicilar'
});

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
});

app.listen(5000, () => {
    console.log("Uygulama çalışıyor");
    //catch((error) => console.log(error.reason));
});