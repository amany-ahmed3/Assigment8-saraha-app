import nodemailer from "nodemailer";

 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth:{
        user: "ahmdamamny777@gmail.com",
        pass: ' stnf mlsb jgge rqmp '
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