
import nodemailer from "nodemailer";
import { config } from "../../config/config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config.emailUser,
        pass: config.emailPass
    }
});

export async function sendEmail(to, subject, html) {
    return await transporter.sendMail({
        from: `"sarah-app" <${config.emailUser}>`,
        to:to,
        subject:subject,
        html:html
    });
}
