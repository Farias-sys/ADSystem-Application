// @Author: Farias-sys
// Last-update: 04/10/2022 by Farias-sys
// File description: Delete rows from tables of databaseconst 

Sequelize = require('sequelize')

// Load models

const modelInventory = require('../../tables/inventory')
const modelTransactions = require('../../tables/transactions')
const modelCategories = require('../../tables/categories')
const modelDepartments = require('../../tables/departments')
const modelMeasurementUnits = require('../../tables/measurement_units')
const modelUsers = require('../../../auth/db/tables/users')
const modelAlerts = require('../../../data/tables/alerts')
const modelShopRequests = require('../../tables/shop_requests')
const modelProviders = require('../../tables/providers')

async function deleteRow(tenant, query){
    tenant = tenant.tenant
    database = query.database
    row_key = query.row_key
    console.log("- DeleteRow: Deleting row requested for Tenant: " + tenant + " at " + row_key + " of database " + database)

    switch (database) {
        case "transactions":
            await modelTransactions.destroy({where:{tenant_id:tenant,id_transaction:row_key}})
            break;
        case "inventory":
            await modelInventory.destroy({where:{tenant_id:tenant,id_item:row_key}})
            break;
        case "users":
            await modelUsers.destroy({where:{tenant_id:tenant, id_user:row_key}})
            break;
        case "alerts":
            await modelAlerts.destroy({where:{tenant_id:tenant, id_alert:row_key}})
            break;
        case "providers":
            await modelProviders.destroy({where:{tenant_id:tenant, id_provider:row_key}})
            break;
        case "categories":
            await modelCategories.destroy({where:{tenant_id:tenant, id_category:row_key}})
            break;
        case "departments":
            await modelDepartments.destroy({where:{tenant_id:tenant, id_department:row_key}})
            break;
        default:
            break;
    }
}

module.exports = deleteRow;