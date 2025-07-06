import { transporter } from "../config/transporter";

const prepareMailData = ({ from, to, subject, text, html, attachments }) => {
    const mailOptions = { from, to, subject, text, html };

    if (attachments) {
        mailOptions.attachments = {
            filename: attachments.filename,
            path: attachments.path
        };
    }
    
    return mailOptions;
}

export const sendEmail = async (mailData) => {
    const preparedMailData = prepareMailData(mailData);
    try {
        const info = await transporter.sendEmail(preparedMailData);
        console.log(info);
    } catch (error) {
        console.error(error.message);
    }
}