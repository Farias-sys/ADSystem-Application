/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {Modal} from "react-bootstrap"

// Modules
import axios from 'axios'

// Styles
import "../../../assets/styles/tables/tables.css"

// Components

import ApproveForm from './ApproveForm';
import DenyForm from './DenyForm'

export default function ShopRequestsTable(){
    const[data, setItems] = useState([])

    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:"shop_requests"})
        setItems(response.data)
    }

    useEffect(()=> {
        getItems()
    }, [])

    const del = {
        deleteRow(e, id_item){
            axios.post("/api/data/delete", {database:'shop_requests', row_key:id_item})
            getItems()
        }
    }

    function renderSwitchPriority(priority){
        let style
        switch (priority) {
            case "urgent":
                style = "status urgent"
                return style;
            case "medium":
                style = "status medium"
                return style;
            case "normal":
                style = "status normal"
                return style;
            default:
                break;
        }
    }

    // Modals

    


    const[showApprove, setShowApprove] = useState(false)
    const handleCloseApprove = () => setShowApprove(false)
    const handleShowApprove = (id) => setShowApprove(true)
    

    const[showDeny, setShowDeny] = useState(false)
    const handleCloseDeny = () => setShowDeny(false)
    const handleShowDeny = () => setShowDeny(true)

    const[id, setID] = useState()
    function handleModal(id){
        setID(id)
        handleShowApprove()
    }

    function handleModalDeny(id){
        setID(id)
        handleShowDeny()
    }

    return(
        <>
        <table class="content-table">
            <tr class="header-tr">
                <th class="header-th-status"></th>
                <th class="header-th">ID</th>
                <th class="header-th">Produto solicitado</th>
                <th class="header-th">Quantidade</th>
                <th class="header-th">Funcionário</th>
                <th class="header-th">Departamento</th>
                <th class="header-th">Descrição</th>
                <th class="header-th">Ações</th>
            </tr>
            <tbody>
                {
                    data.map((item, index)=> (
                        <tr key={item.index} className="content-tr">
                            <td class="status"><div className={renderSwitchPriority(item.priority)}></div></td>
                            <td>{item.id_request}</td>
                            <td>{item.product_requested}</td>
                            <td>{item.quantity}</td>
                            <td>{item.requested_by_user}</td>
                            <td>{item.requested_by_department}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={(e) => {handleModal(item.id_request)}}>
                                    <i class='bx bxs-check-circle' style={{color:'#4bff00'}}  ></i>
                                </button>
                                <button onClick={(e) => {handleModalDeny(item.id_request)}}>
                                    <i class='bx bx-x-circle' style={{color:'#f32300'}}  ></i>
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
                
        <Modal show={showApprove} onHide={handleCloseApprove} className='insert-modal'>
                <Modal.Body className='insert-modal-body'>
                    <ApproveForm id={id}/>   
                </Modal.Body>
            </Modal>

        <Modal show={showDeny} onHide={handleCloseDeny} className='insert-modal'>
            <Modal.Body className='insert-modal-body'>
                <DenyForm id={id}/>
            </Modal.Body>
        </Modal>

        </>
    )
}