//@Author: Faria-sys
//Last-update: 28/09/2022 by Faria-sys
//File description: Orientação da tabela "db_login" para o framework Sequelize

const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../index')

const Users = db.define('users', {
    id_user: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    real_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    department: {
        type: Sequelize.STRING,
    },
    permissions: {
        type: Sequelize.STRING,
    },
    buyer: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    image_path: {
        type: Sequelize.STRING,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
})

Users.sync()

module.exports = Users;