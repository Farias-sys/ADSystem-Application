import InventoryTable from "../Tables/InventoryTable/InventoryTable"
import axios from 'axios'
import React, { useEffect, useState } from 'react';

export default function Print(){
    const[data, setItems] = useState([])
    
    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:"inventory"})
        setItems(response.data)
    }
    
    useEffect(()=> {
        const op = () => {
            getItems()
        }
        op()
    }, [])


    return(
        <>
        <table class="content-table">
            <tr class="header-tr">
                <th class="header-th">ID</th>
                <th class="header-th">
                    Nome
                    
                </th>
                <th class="header-th">Unidade de Medida</th>
                <th class="header-th">Departamento</th>
                <th class="header-th">Fornecedor</th>
                <th class="header-th">Descrição</th>
            </tr>
            <tbody>
                {
                    data.map((item, index)=> (
                        <tr key={item.index} className="content-tr">
                            <td><a className='link-modal-item' /* onClick={(e) => {handleModal(item.id_item)}} */>{item.id_item}</a></td>
                            <td>{item.name_item}</td>
                            <td>{item.measurement_unit_item}</td>
                            <td>{item.category}</td>
                            <td>{item.department}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>        </>
    )
}