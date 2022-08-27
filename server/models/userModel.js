import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength:[5, "Ad soyad en az 5 karakter olmalıdır."],
    },
    email: {
        type: String,
        required: true,
        validate:[validator.isEmail, "Lütfen geçerli bir email adresi giriniz."],
    },
    password: {
        type: String,
        required: true,
        minlength:[8, "Şifreniz en az 8 karakter olmalıdır."],
    },
    userType: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    phoneNumber: {
        type: String,
        required: true,
    },

});

export default mongoose.model("User", userSchema);
