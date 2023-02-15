//@Author: Faria-sys
//Last-update: 28/09/2022 by Faria-sys
//File description: Alter the password on database for a new user

const sequelize = require('sequelize')
const Users = require('../../tables/users')
const encryptPwd = require('../../../../utils/encryptPwd')

async function alterUserPwd(res, data){
    // Set vars with data provided by API

    const username = data.username
    const oldPwd = encryptPwd(data.old_password)
    const newPwd = encryptPwd(data.new_password)

    Find = await Users.findOne ({where:{username:username, password:oldPwd}});

    if(Find == '' || Find == null){
        return {error:"Usuário ou senha incorretos"}
    } else {
        await Users.update({password:newPwd},{where:{username:username}})
    }
}

module.exports = alterUserPwd;