// @Author: Farias-sys
// Last-update: 04/10/2022 by Farias-sys
// File description: Create a new item on inventory database

const { mode } = require('crypto-js');
const { query } = require('express')
const Sequelize = require('sequelize')

// Load models

const modelInventory = require('../../tables/inventory')

async function includeItemInventory(tenant, data){
    tenant = tenant.tenant

    function genUsedItemsJSON(used_items, used_items_quantity){
        var usedItemsJSON = []
        for(var i = 0; i < data.used_items_lenght;i++ ){
            usedItemsJSON.push({'items': used_items[i], "quantity": used_items_quantity[i]})
        }
        return usedItemsJSON 
    }

    if(data.used_items_lenght==0){
        usedItems = null
    } else {
        usedItems = genUsedItemsJSON(data.used_items, data.used_items_quantity)
    }

    const dataArray = {
        tenant_id:tenant,
        name_item:data.item_name,
        measurement_unit_item:data.measurement_unit_item,
        quantity:0,
        category:data.category,
        department:data.department,
        provider:data.provider,
        description:data.description,
        expiration_date:data.expiration_date,
        used_items:usedItems,
    }

    await modelInventory.create(dataArray)
}

module.exports = includeItemInventory;