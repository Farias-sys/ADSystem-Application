//@Author: Faria-sys
//Last-update: 28/09/2022 by Faria-sys
//File description: Controller de verificação do token da sessão

const jsonwebtoken = require('jsonwebtoken')
const { callbackPromise } = require('nodemailer/lib/shared')
require('dotenv').config()


async function Logged(req, res){
    
    async function genData(tenant, username, message, permissions, avatar){
       
        data = {
            tenant:tenant,
            username:username,
            message:message,
            permissions:permissions,
            avatar:avatar,
        }
        
        return data;
    }

    // Captura os cookies
    
    Auth = req.cookies[process.env.TOKEN_NAME]

    let data;

    // Checa a existência do cookie
    if(typeof(Auth)=='undefined'||Auth==''||Auth==null){
        console.log("- LoggedController [ERROR]: JWT Token not found. Session is over.")
        Token = false
    } else {
        Token = jsonwebtoken.verify(Auth, process.env.SECRET_KEY, async function (err, decoded){
            if(err) {
                console.log("- LoggedController [ERROR]: Authentication error")
                return false
            } else {
                tenant = await decoded.tenant
                username = await decoded.username
                permissions = await decoded.permissions
                avatar = await decoded.avatar
                data = await genData(tenant, username, "success", permissions, avatar)
                console.log("- LoggedController: Tenant_id= " + `${tenant}` + " auth successfully")
                return data;
            }})
        }
    return Token
}

module.exports = Logged;
