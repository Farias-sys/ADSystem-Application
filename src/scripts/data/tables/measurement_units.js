//@Author: Faria-sys
//Last-update: 14/12/2022 by Faria-sys
//File description: Orientação da tabela "measurement_units" para o framework Sequelize

const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT 
});

const Measurement_units = database.define("measurement_units", {
    tenant_id: {
        type: Sequelize.INTEGER, 
        allowNull:false,
    },
    measurement_unit_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    measurement_unit: {
        type: Sequelize.STRING,
        allowNull: false,
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

Measurement_units.sync()

module.exports = Measurement_units;