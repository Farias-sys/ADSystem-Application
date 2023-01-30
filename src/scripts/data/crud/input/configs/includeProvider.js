// @Author: Farias-sys
// Last-update: 14/12/2022 by Farias-sys
// File description: Create a new item on providers database


const modelProviders = require('../../../tables/providers')

const Sequelize = require('sequelize')


async function includeProvider(tenant, query){
    tenant = tenant.tenant

    const dataArray = {
        tenant_id:tenant,
        provider_name:query.provider_name
    }

    await modelProviders.create(dataArray)
}

module.exports = includeProvider;