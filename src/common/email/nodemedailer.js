import nodemailer from "nodemailer";
import {config} from "../../config/config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth:{
        user: config.emailUser,
        pass: config.emailPass
    }
})
export async function sendEmail(to,subject,html) {
   await  transporter.sendMail({
        from: '"sarah-app" <ahmdamany777@gmail.com>',
        to: to,
        subject: subject,
        html: html
    })
}