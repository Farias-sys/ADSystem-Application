// @Author: Farias-sys
// Last-update: 29/09/2022 by Farias-sys
// File description: Register a new user on system

const codeGenerator = require("../utils/gencode")
const mailSender = require("../utils/emailSender")
const encryptPwd = require("../utils/encryptPwd")

async function registUser(data){
    // Set vars with data provided by API

    const enterprise_name = data.name_enp
    const database_name = enterprise_name.replace(" ","_")
    const username = data.email
    
    // Generating password

    const password = codeGenerator()
    const crypt_password = encryptPwd(password)

    // Importing tables

    const tableUser = require("../auth/db/tables/users")
    const tableEnterprises = require("./tables/enterprises")
    
    let queryEnterprise = await tableEnterprises.create({name:enterprise_name,representant_email:username,type_of_plan:1})
    let queryUser = await tableUser.create({username:username,password:crypt_password,enterprise_id:queryEnterprise.id_enterprises})

    await dynamicDatabaseBuilder(database_name)

    await mailSender(username, password)
}

module.exports = registUser;