// @Author: Farias-sys
// Last-update: 14/12/2022 by Farias-sys
// File description: Create a new user on users database

const Sequelize = require('sequelize')

// Load models

const modelUsers = require('../../../../auth/db/tables/users')

// Load utils

const emailSender = require('../../../../utils/emailSender')
const genPwd = require('../../../../utils/gencode')
const encryptPwd = require('../../../../utils/encryptPwd')

async function includeUser(tenant, data){
    tenant = tenant.tenant
    const password = genPwd()
    const encrypted_password = encryptPwd(password)
    
    const dataArray = {
        tenant_id:tenant,
        real_name:data.real_name,
        username:data.username,
        password:encrypted_password,
        department:data.department,
        permissions:data.permissions,
        buyer:data.buyer,
    }

    await modelUsers.create(dataArray)

    await emailSender(data.username, password)
}

module.exports = includeUser;