//@Author: Faria-sys
//Last-update: 28/09/2022 by Faria-sys
//File description: Controller de login

const { reset } = require("nodemon");
const Users = require("../tables/users");
const jwt = require("jsonwebtoken")
const encryptPwd = require("../../../utils/encryptPwd")
require('dotenv').config()

async function Login(res, data){ // O campo "data" receberá os dados do body parser (Formulário front-end)
    const username = await data.email
    const password = await encryptPwd(data.password)
        
    // Busca o usuário no banco de dados

    console.log("- LogginController: Received request for login of user " + username)
    Find = await Users.findOne({where: {username: username, password:password}}) 
        .then(res => {return res})
    // Verifica se o usuário existe

    if(Find == '' || Find == null){
        console.log("- LogginController [ERROR]: Username/Password not found for "+ username)
        return {message:'Error'}
    }

    const tenant = await Find.tenant_id
    const permissions = await Find.permissions
    const avatar_path = await Find.image_path
    let Token = jwt.sign({
        username: `${username}`,
        tenant: `${tenant}`, 
        permissions: `${permissions}`,
        avatar: `${avatar_path}`,
    }, process.env.SECRET_KEY)

    res.cookie(process.env.TOKEN_NAME, Token);  
    res.sendStatus(200)
    console.log("- LogginController: User " + username + " found at tenant " + tenant + " procceed with JWT Token with " + permissions + " PEX")   
}

module.exports = Login;