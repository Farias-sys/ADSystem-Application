//@Author: Faria-sys
//Last-update: 14/12/2022 by Faria-sys
//File description: Orientação da tabela "shop_requests" para o framework Sequelize

const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT 
});

const ShopRequests = database.define("shop_requests", {
    id_request:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    product_requested:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    measurement_unit:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    requested_by_user: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    requested_by_department: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
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

ShopRequests.sync()

module.exports = ShopRequests;