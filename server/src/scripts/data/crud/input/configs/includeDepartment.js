// @Author: Farias-sys
// Last-update: 14/12/2022 by Farias-sys
// File description: Create a new item on departments database

const Sequelize = require('sequelize')

// Load models

const modelDepartment = require('../../../tables/departments')

async function includeDepartment(tenant, data){
    tenant = tenant.tenant
    const dataArray = {
        tenant_id:tenant, 
        name_department:data.name_department,
    }

    await modelDepartment.create(dataArray)
}

module.exports = includeDepartment;