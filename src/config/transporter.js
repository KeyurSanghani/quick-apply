import { createTransport } from "nodemailer";

// Create transporter object 
export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'zora.mraz@ethereal.email',
        pass: '55tKdFjuekjBSntBg6'
    }
});