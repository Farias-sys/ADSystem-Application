Sequelize = require('sequelize')
const { request } = require('express')
const nodemailer = require('nodemailer')

const modelShopRequests = require('../../tables/shop_requests')

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

async function manageShopRequest(tenant, query, operation){
    username = tenant.username
    tenant = tenant.tenant
    
    async function mailUser(destination, operation){
        switch (operation) {
            case "approve":
                
                subject = 'ADSystem | Seu pedido de compra foi aprovado'
                message = ''
                message += "=======================================\n"
                message += `Sua solicitação de compra de ${request_data.product_requested} foi aprovada por  ${username}\n\n`
                message += `Observações: ${query.observations}`
                break;
            case "deny":
                subject = 'ADSystem | Seu pedido de compra foi negado'
                message = ''
                message += "=======================================\n"
                message += `Sua solicitação de compra de ${request_data.product_requested} foi negada por  ${username}\n\n`
                message += `Observações: ${query.observations}`
            default:
                break;
        }

        const mailOptions = {
            from: 'adsystem.tcc@gmail.com',
            to: destination,
            subject: subject,
            text: message,
        };
        await transporter.sendMail(mailOptions)
    }


    const request_data = await modelShopRequests.findOne({where:{tenant_id:tenant, id_request:query.row_key}})
    
    const destination = await request_data.requested_by_user
    await mailUser(destination, operation)
    await modelShopRequests.destroy({where:{tenant_id:tenant,id_request:query.row_key}})
    
}

module.exports = manageShopRequest;