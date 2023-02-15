// @Author: Farias-sys
// Last-update: 14/12/2022 by Farias-sys
// File description: Create a new item on category database

const Sequelize = require('sequelize')

// Load models

const modelCategories = require('../../../tables/categories')

async function includeCategory(tenant, data){
    tenant = tenant.tenant
    const dataArray ={
        tenant_id:tenant,
        name_category:data.name_category,
        description:data.description,
    }
    
    await modelCategories.create(dataArray)
}

module.exports = includeCategory;