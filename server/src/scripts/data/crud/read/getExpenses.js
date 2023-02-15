const modelDepartments = require('../../tables/departments')
const modelTransaction = require('../../tables/transactions')

async function getExpenses(tenant, query){
    tenant = tenant.tenant
    

    switch (query.type) {
        case "by":
            let data = []

            const departments = await modelDepartments.findAll({where:{tenant_id:tenant}})
        
            await departments.map((item, index) => (
                data.push({'name':item.name_department, 'Gastos':item.total_expenses})
            ))
        
            return data;
        case "all":
            let total_expenses = 0
            const transaction = await modelTransaction.findAll({where:{tenant_id:tenant, type_operation_transaction:'add'}})
            await transaction.map((item, index) => (
                total_expenses += parseFloat(item.price)
            ))
            return {'expenses':total_expenses};
        default:
            break;
    }
}

module.exports = getExpenses;