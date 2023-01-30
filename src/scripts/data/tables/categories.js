//@Author: Faria-sys
//Last-update: 14/12/2022 by Faria-sys
//File description: Orientação da tabela "categories" para o framework Sequelize

const { mode } = require('crypto-js');
const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT 
});

const Category = database.define('categories', {
    tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_category: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name_category:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull:true,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }
})

Category.sync()

module.exports = Category;