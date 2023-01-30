/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

// Modules
import axios from 'axios'

// Styles
import "../../../assets/styles/tables/tables.css"



export default function InventoryTable(){
    
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
    
    const del = {
        deleteRow(e, id_item){
            axios.post("/api/data/delete", {database:'inventory', row_key:id_item})
            getItems()
        }
    }
    

    const[showItem, setShowItem] = useState(false)
    const handleCloseItem = () => setShowItem(false);
    const handleShowItem = () => setShowItem(true)

    const[itemID, setItemID] = useState()
    function handleModal(id){
        setItemID(id)
        handleShowItem()
    }


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
                <th class="header-th">Ações</th>
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
                            <td>
                                <button class="btn-options-table">
                                    <i class='bx bxs-edit' ></i>
                                </button>
                                <button onClick={(e) => del.deleteRow(e, item.id_item)} class="btn-options-table">
                                    <i class='bx bxs-trash' ></i>
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

{/*         <Modal show={showItem} onHide={handleCloseItem} className='show-item-modal'>
            <Modal.Body className='insert-modal-body'>
                <DisplayItem id={itemID}/>
            </Modal.Body>
        </Modal> */}
        </>
    )
}