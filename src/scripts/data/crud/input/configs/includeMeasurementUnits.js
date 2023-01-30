// @Author: Farias-sys
// Last-update: 14/12/2022 by Farias-sys
// File description: Create a new item on measurement_units database

const Sequelize = require('sequelize')

// Load models

const modalMeasurementUnits = require('../../../tables/measurement_units')

async function includeMeasurementUnit(tenant, data){
    tenant = tenant.tenant
    const dataArray = {
        tenant_id:tenant,
        measurement_unit:data.measurement_unit,
        measurement_unit_name:data.measurement_unit_name,
    }

    const queryDatabase = new Sequelize(process.env.DATABASE_NAME, process.env.LOCAL_DATABASE_USERNAME, process.env.LOCAL_DATABASE_PASSWORD, {
        dialect: 'mysql', 
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT 
    });

    await modalMeasurementUnits.create(dataArray)
}

module.exports = includeMeasurementUnit;