// @Author: Farias-sys
// Last-update: 14/12/2022 by Farias-sys
// File description: Create a new item on shop_requests database

const Sequelize = require('sequelize')
const nodemailer = require('nodemailer')


// Load models

const modelShopRequests = require('../../tables/shop_requests')
const modelUsers = require('../../../auth/db/tables/users')

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




async function includeShopRequest(tenant, data){
    username = tenant.username
    tenant = tenant.tenant
    
    async function mailUser(destination, message, priority){
        switch (priority) {
            case "urgent":
                subject = 'ADSystem | Novo pedido de compra | Urgente'
                break;
            default:
                subject = 'ADSystem | Novo pedido de compra'
                break;
        }

        const mailOptions = {
            from: 'adsystem.tcc@gmail.com',
            to: destination,
            subject: subject,
            text: message,
        };
        transporter.sendMail(mailOptions)
    }
    
    const users = await modelUsers.findAll({where:{tenant_id:tenant, buyer:1}})

    let message = "";
    message += "=======================================\n"
    message += `Uma nova solicitação de compra foi feita por ${username} \n\n`
    message += `Produto solicitado: ${data.product_requested}\n`
    message += `Quantidade solicitada: ${data.quantity} (${data.measurement_unit})`

    await users.map((user, index) => (
        mailUser(user.username, message, data.priority)
    ))
    

    const dataArray = {
        tenant_id:tenant,
        product_requested:data.product_requested,
        measurement_unit:data.measurement_unit,
        requested_by_user:username,
        requested_by_department:data.department,
        priority:data.priority,
        quantity:data.quantity,
        description:data.description,
    }

    await modelShopRequests.create(dataArray)
}

module.exports = includeShopRequest;