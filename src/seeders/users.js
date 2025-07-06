import User from "../models/users.js";
import { connect } from "../config/dbConnection.js"
import dotenv from "dotenv"
dotenv.config()

const createSuperAdmin = async () => {
    const admin = await User.findOne({ email: "keyur.sanghani10@gmail.com" });
    if (admin) {
        console.log("User already exists", admin);
        return admin;
    } else {
        const CreatedAdmin = await User.create({
            name: process.env.SUPER_ADMIN_NAME,
            email: process.env.SUPER_ADMIN_EMAIL,
            password: process.env.SUPER_ADMIN_PASSWORD,
            phone_no: process.env.SUPER_ADMIN_PHONE_NO
        })
        console.log("User created successfully", CreatedAdmin);
        return CreatedAdmin;
    }
}

// Run seeder
connect().then(() => {
    createSuperAdmin();
})