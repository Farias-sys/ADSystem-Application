// @Author: Farias-sys
// Last-update: 04/10/2022 by Farias-sys
// File description: Read data of database

const { query } = require('express');
const Sequelize = require('sequelize')

// Load models

const modelInventory = require('../../tables/inventory')
const modelTransactions = require('../../tables/transactions')
const modelCategories = require('../../tables/categories')
const modelDepartments = require('../../tables/departments')
const modelMeasurementUnits = require('../../tables/measurement_units')
const modelUsers = require('../../../auth/db/tables/users')
const modelAlerts = require("../../tables/alerts")
const modelProviders = require('../../tables/providers')
const modelShopRequests = require("../../tables/shop_requests")

const genAlerts = require('../read/genAlerts');
const updateInventory = require('../input/updateInventory');

async function readDatabase(tenant, query){
    if(tenant==false || undefined){
        console.log(tenant)
        return "AuthError"
    } else{
        auto_username = tenant.username;
        tenant = tenant.tenant;
        type = query.database;

        id_item = query.id
        category = query.category
        username = query.username

        let data;

        switch(type){
            case "inventory":
                await updateInventory(tenant)
                data = await modelInventory.findAll({where:{tenant_id:tenant}})
                return data;
            case "inventory:specific":
                data = await modelInventory.findOne({where:{tenant_id:tenant,id_item:id_item}})
                return data;
            case "inventory:category":
                data = await modelInventory.findAll({where:{tenant_id:tenant,category:category}})
                return data;
            case "transactions":
                data = await modelTransactions.findAll({where:{tenant_id:tenant}})
                return data;
            case "transactions:specific":
                data = await modelTransactions.findAll({where:{tenant_id:tenant,item_id:id_item}})
                return data;
            case "transactions:specific:user":
                data = await modelTransactions.findAll({where:{tenant_id:tenant, added_by:username}})
                return data;
            case "categories":
                data = await modelCategories.findAll({where:{tenant_id:tenant}})
                return data;
            case "departments":
                data = await modelDepartments.findAll({where:{tenant_id:tenant}})
                return data;
            case "providers":
                data = await modelProviders.findAll({where:{tenant_id:tenant}})
                return data;
            case "measurement_units":
                data = await modelMeasurementUnits.findAll({where:{tenant_id:tenant}})
                return data;           
            case "users":
                data = await modelUsers.findAll({where:{tenant_id:tenant}})
                return data;
            case "users:specific":
                data = await modelUsers.findOne({where:{tenant_id:tenant,username:username}})
                return data;
            case "users:auto":
                data = await modelUsers.findOne({where:{tenant_id:tenant,username:auto_username}})
                return data;
            case "alerts":
                await genAlerts(tenant)
                data = await modelAlerts.findAll({where:{tenant_id:tenant}})
                return data;   
            case "shop_requests":
                data = await modelShopRequests.findAll({where:{tenant_id:tenant}})
                return data;
        }
    }
}

module.exports = readDatabase;