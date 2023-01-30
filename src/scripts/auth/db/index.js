//@Author: Faria-sys
//Last-update: 28/09/2022 by Faria-sys
//File description: Comunicação com a base de dados

require('dotenv').config()

const Sequelize = require('sequelize')
const seql = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host:'localhost',
    port:'3306'
});

module.exports = seql 