import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
    try{
        //console.log(req.body);
        const {fullname, password, correctionPassword, phoneNumber, email} = req.body;
        
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "Kullanıcı zaten var"});
            
        }

        if(password !== correctionPassword){
            return res.status(400).json({message: "Şifreler uyuşmuyor"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
        });
        
        return res.status(201).json(createdUser);
    } catch(error){
        console.log(error);
        return res.json({message: "Kullanıcı oluşturulamadı"});
        
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Kullanıcı bulunamadı"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Parola yanlış"});
        }
        return res.status(200).json({user, message: "Giriş başarılı"});

    }   catch(error){
            return res.status(400).json({message: error.message});
    }
});



export default router;

