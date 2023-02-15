/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../../assets/styles/boxdisplay/BoxDisplay.css'
import {Modal} from "react-bootstrap"
import axios from '../../../lib/axios';
// Components

import AlertsTable from "../../Tables/AlertsTable/AlertsTable.js";


import InventoryTable from '../../Tables/InventoryTable/InventoryTable';
import InventoryForm from '../../Forms/Inventory/InventoryForm';

import TransactionsTable from '../../Tables/TransactionsTable/TransactionsTable';
import TransactionForm from '../../Forms/Transactions/TransactionForm';

import ShopRequestsTable from '../../Tables/ShopRequestsTable/ShopRequestsTable';
import ShopRequestForm from '../../Forms/ShopRequest/ShopRequestForm';

import StockTable from '../../Tables/StockTable/StockTable';

import WorkersTable from '../../Tables/WorkersTable/WorkersTable';
import WorkerForm from '../../Forms/Worker/WorkerForm'

export default function BoxDefaultDisplayTable(props){
    const[showAdd, setShowAdd] = useState(false)
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true)

    
    const[showRemove, setShowRemove] = useState(false)
    const handleCloseRemove = () => setShowRemove(false)
    const handleShowRemove = () => setShowRemove(true)

    const get = {
        printPDF(e, target){
            axios.post("/api/utils/printpdf", {target:target})
        }
    }

    const TableName = props.type 

    let Title
    let ExibithionTable
    let ExibithionForm
    let ExibithionRemoveForm

    function exibithionBtns(type){
        switch (type) {
            case "inventory":
                return(
                    <>
                        <button className='container-type-button add-btn' onClick={handleShowAdd}>
                            <i class='bx bx-list-plus' ></i>
                            Cadastrar
                        </button>
                        <button className='container-type-button print-btn' onClick={(e) => {window.open('/print_material')}}>
                            <i class='bx bxs-printer' ></i>
                            Imprimir
                        </button>
                    </>
                )
            case "transactions":
                return(
                    <>
                        <button className='container-type-button add-btn' onClick={handleShowAdd}>
                            <i class='bx bx-down-arrow-alt' ></i>
                            Entrada
                        </button>
                        <button className='container-type-button remove-btn' onClick={handleShowRemove}>
                            <i class='bx bx-up-arrow-alt' ></i>
                            Saída
                        </button>
                        <button className='container-type-button print-btn' onClick={(e) => {window.open('/print_transactions')}}>
                            <i class='bx bxs-printer' ></i>
                            Imprimir
                        </button>
                    </>
                )
            case "shop_requests":
                return(
                    <>
                        <button className='container-type-button add-btn' onClick={handleShowAdd}>
                            <i class='bx bx-cart-add'></i>
                            Novo pedido
                        </button>
                    </>
                )
            case "workers":
                return (
                    <>
                        <button className='container-type-button add-btn' style={{width:'9rem'}} onClick={handleShowAdd}>
                            Novo funcionário
                            <i class='bx bx-run'></i>
                        </button>
                    </>
                )
                break;
        
            default:
                break;
        }
    }

    let class_add
    switch (TableName) {
        case "alerts":
            Title = "Alertas"
            ExibithionTable = <AlertsTable/>
            class_add = 'alerts'
            break;
        case "inventory":
            Title = "Materiais"
            ExibithionTable = <InventoryTable/>
            ExibithionForm = <InventoryForm/>
            class_add = 'materials'
            break;
        case "transactions":
            Title = "Transações"
            ExibithionTable = <TransactionsTable/>
            ExibithionForm = <TransactionForm operation="add"/>
            ExibithionRemoveForm = <TransactionForm operation="remove"/> 
            class_add= 'transactions'
            break;
        case "shop_requests":
            Title = "Pedidos de compra"
            ExibithionTable = <ShopRequestsTable />
            ExibithionForm = <ShopRequestForm/>
            class_add = 'shoprequests'
            break;
        case "stock":
            Title = "Estoque"
            ExibithionTable = <StockTable/>
            class_add = 'stock'
            break;
        case "workers":
            Title = "Usuários"
            ExibithionTable = <WorkersTable/>
            ExibithionForm= <WorkerForm/>
            class_add = 'workers'
            break;
        default:
            break;
    }

    return(
        <>
            <div className={'container ' + class_add}>
                <div className='container-content'>
                    <div className='container-header'>
                        <div className="container-title">{Title}</div>
                        <div className='btns'>
                            {exibithionBtns(TableName)}
                        </div>
                    </div>
                    <div className={'container-table ' + class_add}>
                        {ExibithionTable}
                    </div>
                    
                </div>
                <div className={'container-blue '+ class_add}></div>
            </div>

             <Modal show={showAdd} onHide={handleCloseAdd} className='insert-modal'>
                <Modal.Body className='insert-modal-body'>
                    {ExibithionForm}
                </Modal.Body>
            </Modal>

            <Modal show={showRemove} onHide={handleCloseRemove} className='insert-modal remove'>
                <Modal.Body className='insert-modal-body'>
                    {ExibithionRemoveForm}
                </Modal.Body>
            </Modal>
        </>
    )
}