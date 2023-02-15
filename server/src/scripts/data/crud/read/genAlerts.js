const Sequelize = require('sequelize')

const modelAlerts = require('../../tables/alerts')
const modelInventory = require('../../tables/inventory')

const dateManagement = {
    compare(date1, date2){

        if(date1==false){
            return false;
        } else{
            if(date1.getTime() <= date2.getTime()){
                return true;
            } else if (date1 - date2 <= 259200000 && date1 - date2 > 0){
                return 'near'
            } else {
                return false;
            }
        }
    },

    constructDate(date){
        if(date.getTime()==0){
            return false
        } else {
            date = new Date(date)
            const real_date = date.getDate() + 1
            const new_date = new Date(date.getFullYear(), date.getMonth(), real_date)
            return new_date
        }
            
    }

}

const databaseOperations = {
    async dbSearch(item_name, dataArray){
        Find = await modelAlerts.findAll({where:{tenant_id:tenant, for_product:item_name, type_alert:"product_expired"}})
        if(Find == '' || Find == null){
            await modelAlerts.create(dataArray)
        }
    }
}

function generate(item_id, item_name, expired){
    if(expired==true){
        custom_message = `O produto ${item_name} está vencido.`
        dataArray = {
            tenant_id:tenant,
            type_alert:"product_expired",
            for_product:item_name,
            for_product_id:item_id,
            custom_message:custom_message,
            priority:"urgent"
        }
        databaseOperations.dbSearch(item_name, dataArray)
    } else if(expired=='near'){
        custom_message = `O produto ${item_name} está próximo do vencimento.`
        dataArray = {
            tenant_id:tenant,
            type_alert:"product_expired",
            for_product:item_name,
            for_product_id:item_id,
            custom_message:custom_message,
            priority:"normal"
        }
        databaseOperations.dbSearch(item_name, dataArray)
    }
}


async function genAlerts(tenant){
    const inventoryData = await modelInventory.findAll({where:{tenant_id:tenant}})
    
    let actual_date = new Date()
    const today = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate())

    await inventoryData.map((item, index) => (
        generate(item.id_item, item.name_item, dateManagement.compare(dateManagement.constructDate(new Date(item.expiration_date)), today))    
    ))

}

module.exports = genAlerts;