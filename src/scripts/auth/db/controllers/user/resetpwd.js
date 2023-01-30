//@Author: Faria-sys
//Last-update: 28/09/2022 by Faria-sys
//File description: Reset password

const sequelize = require('sequelize')
const Users = require('../../tables/users')

const genPwd = require('../../../../utils/gencode')
const encryptPwd = require('../../../../utils/encryptPwd')

const nodemailer = require('nodemailer')

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


async function resetPwd(data){
    Find = Users.findOne({where:{username:data.username}})

    if(Find == '' || Find == null || Find == 0){
        return 'InexistentUser'
    } else {
        const username = data.username
        const password = genPwd()
        const encrypted_password = encryptPwd(password)

        await Users.update({password:encrypted_password},{where:{username:username}})

        const subject = "ADSystem | Nova senha de acesso"
    
        let message = "";
        message += "=======================================\n"
        message += `Aqui está sua nova senha de acesso para ${username}\n`
        message += `Nova senha: ${password}`
    
        const destination = data.username
    
        const mailOptions = {
            from: 'adsystem.tcc@gmail.com',
            to: destination,
            subject: subject,
            text: message,
        };

        transporter.sendMail(mailOptions)
    }


}

module.exports = resetPwd