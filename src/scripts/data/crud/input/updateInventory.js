// @Author: Farias-sys
// Last-update: 04/10/2022 by Farias-sys
// File description: Update inventory database (generally uses the transaction table)
// and it's complementary to the 'includeTransaction.js' script

// Load models

const modelTransactions = require('../../tables/transactions')
const modelInventory = require('../../tables/inventory')
const modelDepartment = require('../../tables/departments')

const management = {
    async update(transaction_id, item_id, quantity, operation,department, price){
        Find = await modelInventory.findOne({where:{tenant_id:tenant,id_item:item_id}})
        console.log(Find.used_items)
        if(Find.used_items==null || Find.used_items==undefined||Find.used_items==0){
            await this.loadQuery(transaction_id, item_id, quantity, operation, price, Find,department, false)
        } else {
            await this.loadQuery(transaction_id, item_id, quantity, operation, price, Find,department, false)
            await Find.used_items.map((item, index) => (
                console.log(item.items),
                this.loadQuery(transaction_id, item.items, item.quantity, "remove", price, null,department, true)
            ))
        }
    },
    async loadQuery(transaction_id, item_id, quantity, operation, price, Find,department, has_used_items){
        if(has_used_items==true){
            Find = await modelInventory.findOne({where:{tenant_id:tenant, name_item:item_id}})
            await modelInventory.update(
                {
                    quantity:(Find.quantity-quantity)
                }, {
                    where: {tenant_id:tenant, name_item:item_id}
                }
            )
            await modelTransactions.update({incorporated:true},{where:{tenant_id:tenant, id_transaction:transaction_id}})
        }else {
            switch (operation) {
                case "add":
                    FindDeparment = await modelDepartment.findOne({where:{tenant_id:tenant, name_department:department}})
                    await modelInventory.update({
                        quantity:(Find.quantity+quantity)
                    }, {
                        where: {tenant_id:tenant, id_item:item_id}
                    })

                    await modelDepartment.update({
                        total_expenses:(FindDeparment.total_expenses+price)
                    }, {
                        where:{tenant_id:tenant, name_department:department}
                    })
                    
                    await modelTransactions.update({incorporated:true},{where:{tenant_id:tenant, id_transaction:transaction_id}})

                    break;
                case "remove":
                    final_quantity = await Find.quantity - quantity
                    if(final_quantity<=0){
                        final_quantity = 0
                    }
                    await modelInventory.update({
                        quantity:final_quantity
                    }, {
                        where:{tenant_id:tenant, id_item:item_id}
                    })

                    await modelTransactions.update({incorporated:true},{where:{tenant_id:tenant, id_transaction:transaction_id}})
                    break;
                default:
                    break;
            }
        }
    }
}

async function updateInventory(tenant){
    const transactions_data = await modelTransactions.findAll({where:{tenant_id:tenant, incorporated:false}}) 
    
    await transactions_data.map((item, index) => (
        management.update(item.id_transaction, item.item_id, item.item_quantity, item.type_operation_transaction,item.department, item.price)
    ))
}

module.exports = updateInventory;