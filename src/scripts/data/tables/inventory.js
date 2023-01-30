//@Author: Faria-sys
//Last-update: 02/10/2022 by Faria-sys
//File description: Orientação da tabela "inventories" para o framework Sequelize

const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT 
});

const Inventory = database.define('inventories', {
    tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_item: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name_item: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    measurement_unit_item: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    expiration_date:{
        type: Sequelize.DATE,
        allowNull: true,
    },
    used_items:{
        type: Sequelize.JSON,
        allowNull: true,
    },
    provider:{
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

Inventory.sync()

module.exports = Inventory;