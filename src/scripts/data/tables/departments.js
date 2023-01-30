//@Author: Faria-sys
//Last-update: 14/12/2022 by Faria-sys
//File description: Orientação da tabela "departments" para o framework Sequelize

const Sequelize = require('sequelize')
require('dotenv').config()

const database = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT 
});

const Departments = database.define("departments", {
    tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_department: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name_department: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    total_expenses: {
        type: Sequelize.FLOAT,
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

Departments.sync()

module.exports = Departments;