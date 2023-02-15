// @Author: Farias-sys
// Last-update: 04/10/2022 by Farias-sys
// File description: Create a new transaction on Database

// Modules

// Load models

const modelInventory = require('../../tables/inventory')
const modelTransactions = require('../../tables/transactions')

// Update

const updateInventoryTable = require('./updateInventory')

// Get data from registered item

const funcGetData = {
    async getDataFromRegisteredItem(tenant, item_name){
        data = await modelInventory.findOne({where:{tenant_id:tenant,name_item:item_name}})
        item_measurement_type = data.measurement_unit_item
        item_id = data.id_item
        used_items = data.used_items
        department = data.department
        data = [item_id, item_measurement_type, department]
        return data
    }
}


async function includeTransaction(tenant, data){
    username = tenant.username
    tenant = tenant.tenant
    
    console.log("- includeTransaction[Function]: Catching the data from registered item " + data.item_name + "...")
    const dataFromRegisteredItem = await funcGetData.getDataFromRegisteredItem(tenant, data.item_name)

    const dataArray = {
        tenant_id:tenant,
        item_id:dataFromRegisteredItem[0],
        item_name:data.item_name,
        type_operation_transaction:data.operation,
        item_measurement_type:dataFromRegisteredItem[1],
        item_quantity:data.item_quantity,
        price:data.price,
        added_by:username,
        department:dataFromRegisteredItem[2],
        description_transaction:data.description_transaction,
        document: data.document,
        incorporated:false,
    }

    await modelTransactions.create(dataArray)
    console.log("- includeTransaction[Function]: Transaction created. Updating inventory...")
}

module.exports = includeTransaction;