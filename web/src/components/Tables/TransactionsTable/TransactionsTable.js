/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

// Modules
import axios from '../../../lib/axios'

// Styles
import "../../../assets/styles/tables/tables.css"

// Components
import FormSelect from "../../Forms/FormSelect"

import {Modal} from "react-bootstrap"
import DisplayUser from '../WorkersTable/DisplayUsers';

export default function TransactionsTable(){
    const[data, setItems] = useState([])
    const[origData, setData] = useState([])
    
    
    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:"transactions"})
        setItems(response.data.reverse())
        setData(response.data)
    }

    useEffect(()=> {
        getItems()
    }, [])
    const del = {
        deleteRow(e, item_id){
            axios.post("/api/data/delete", {database:'inventory', row_key:item_id})
            window.location.reload()
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

    function searchTable(value) {
        const filteredData = [];
       
        if (value.length === 0) {
          return origData; 
        }
       
        for (let i = 0; i < origData.length; ++i) {
         const newValue = value.toLowerCase(); 
       
         const user = origData[i].item_name.toLowerCase();
       
         if (user.includes(newValue)) {
           filteredData.push(origData[i]);
         }
        }
        return filteredData;
       }

    function handleInput(e) {
        const inputValue = e.target.value; 
        setItems(searchTable(inputValue));  
    }

    const[showDisplayItem, setShowDisplayItem] = React.useState(false)
    const handleCloseDisplayItem = () => setShowDisplayItem(false);
    const handleShowItem = (username) => {setShowDisplayItem(true)
         setUsername(username)}

    const[username, setUsername] = useState('')

    return(
        <>
        <table class="content-table">
            <tr class="header-tr">
                <th class="header-th">ID</th>
                <th class="header-th">
                    Nome
                    <button ><select onChange={(e) =>handleInput(e)}><FormSelect type={'inventory'} placeholder={'🔍'}/></select></button>
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
                            <td><button className='modal-opener' onClick={(e) => handleShowItem(item.added_by)}>{item.added_by}</button></td>
                            <td>{item.description_transaction}</td>
{/*                             <td>
                                <button class="btn-options-table">
                                <i class='bx bxs-edit' ></i>
                                </button>
                                <button onClick={(e) => del.deleteRow(e, item.item_id)} class="btn-options-table">
                                <i class='bx bxs-trash'></i>
                                </button>
                            </td> */}
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <Modal show={showDisplayItem} onHide={handleCloseDisplayItem} className='show-item-modal'>
            <Modal.Body className='insert-modal-body'>
                <DisplayUser username={username}/>
            </Modal.Body>
        </Modal>
        </>
    )

}