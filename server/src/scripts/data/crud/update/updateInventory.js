// @Author: Farias-sys
// Last-update: 04/10/2022 by Farias-sys
// File description: Update data on inventory database


// Load models 

const modelInventory = require('../../tables/inventory')
const modelTransactions = require('../../tables/transactions')

async function updateInventory(tenant, data){
    tenant = tenant.tenant

    const id_item = data.id_item

    const dataFromTargetItem = await modelInventory.findOne({where:{tenant_id:tenant, id_item:id_item}})

    const new_name_item = await data.item_name!=null ? data.item_name : dataFromTargetItem.name_item
    const new_category = await data.category!=null ? data.category : dataFromTargetItem.category
    const new_department = await data.department!=null ? data.department : dataFromTargetItem.department
    const new_provider = await data.provider!= null ? data.provider: dataFromTargetItem.provider
    const new_description = await data.description!=null ? data.description : dataFromTargetItem.description
    const new_expiration_date = await data.expiration_date!=null ? data.expiration_date : dataFromTargetItem.expiration_date

    const dataArray = {
        name_item:new_name_item,
        category:new_category,
        department:new_department,
        description:new_description,
        provider:new_provider,
        expiration_date:new_expiration_date
    }

    console.log(dataArray)

    await modelInventory.update(dataArray, {where:{tenant_id:tenant, id_item:id_item}})
    await modelTransactions.update({item_name:new_name_item}, {where:{tenant_id:tenant, item_id:id_item}})

}

module.exports = updateInventory;