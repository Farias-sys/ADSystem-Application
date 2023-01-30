//@Author: Faria-sys
//Last-update: 14/12/2022 by Faria-sys
//File description: Orientação da tabela "alerts" para o framework Sequelize

const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT 
});

const Alerts = database.define("alerts", {
    id_alert: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    type_alert: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    for_date: {
        type: Sequelize.DATE,
    },
    for_quantity: {
        type: Sequelize.FLOAT,
    },
    for_product: {
        type: Sequelize.STRING,
    },
    for_product_id: {
        type: Sequelize.INTEGER,
    },
    for_measurement_unit: {
        type: Sequelize.STRING,
    },
    custom_message: {
        type: Sequelize.STRING,
    },
    priority: {
        type: Sequelize.STRING,
        allowNull:false,
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

Alerts.sync()

module.exports = Alerts;