//@Author: Faria-sys
//Last-update: 12/09/2022 by Faria-sys
//File description: Sends emails

const nodemailer = require('nodemailer')

async function sendActivationEmail(destination, password){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "adsystem.tcc@gmail.com",
            pass: "yuptrqliktgnqvxt"
    },
        tls: { rejectUnauthorized: false }
    })

    let message = "";
    message += "=======================================\n"
    message += "Bem vindo ao ADSystem! Aqui estão os dados para seu acesso. Lembrando que sua senha é irrevogável, pessoal e intransferível.\n\n"
    message += "Email (login/username): "
    message += destination
    message += "\n"
    message += "Senha de acesso: "
    message += password

    const mailOptions = {
        from: 'adsystem.tcc@gmail.com',
        to: destination,
        subject: 'Bem-vindo ao ADSystem | Activation Notify',
        text: message,
    };

    transporter.sendMail(mailOptions)
}

module.exports = sendActivationEmail;