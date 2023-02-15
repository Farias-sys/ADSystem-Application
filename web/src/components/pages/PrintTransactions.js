import axios from '../../lib/axios';
import React, { useEffect, useState } from 'react';

export default function Print(){
    const[data, setData] = useState([])
    
    
    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:"transactions"})
        setData(response.data.reverse())
    }

    useEffect(()=> {
        getItems()
    }, [])

    function renderSwitchColor(type){
        switch (type) {
            case "add":
                return("red")
            case "remove":
                return("#929292")
            default:
                break;
        }
    }

    function renderConditionalPrice(price){
        if(price==null || price ==undefined){
            return "----"
        } else {
            price = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            return price
        }
    }

    function renderSwitchMessageOperation(type){
        switch (type) {
            case "add":
                return("Entrada")
            case "remove":
                return("Saída")
            default:
                break;
        }
    }

    return(
        <>
        <table class="content-table">
            <tr class="header-tr">
                <th class="header-th">ID</th>
                <th class="header-th">
                    Nome
                    
                    </th>
                <th class="header-th">Operação</th>
                <th class="header-th">Unidade de medida</th>
                <th class="header-th">Quantidade</th>
                <th class="header-th">Preço de compra</th>
                <th class="header-th">Documento relacionado</th>
                <th class="header-th">Usuário</th>
                <th class="header-th">Descrição</th>
            </tr>
            <tbody>
                {
                    data.map((item, index)=> (
                        <tr key={item.item_id} className="content-tr">
                            <td>{item.id_transaction}</td>
                            <td>{item.item_name}</td>
                            <td>{renderSwitchMessageOperation(item.type_operation_transaction)}</td>
                            <td>{item.item_measurement_type}</td>
                            <td>{item.item_quantity}</td>
                            <td style={{color:renderSwitchColor(item.type_operation_transaction)}}>{renderConditionalPrice(item.price)}</td>
                            <td>{item.document}</td>
                            <td>{item.added_by}</td>
                            <td>{item.description_transaction}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    )

}