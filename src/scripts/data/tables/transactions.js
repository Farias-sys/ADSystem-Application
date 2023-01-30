//@Author: Faria-sys
//Last-update: 02/10/2022 by Faria-sys
//File description: Orientação da tabela "transactions" para o framework Sequelize

const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT 
});

const Transactions = database.define('Transactions', {
    tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_transaction: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    item_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type_operation_transaction: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    item_measurement_type:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    item_quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    added_by: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description_transaction: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    document: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    incorporated: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false
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

Transactions.sync()

module.exports = Transactions;