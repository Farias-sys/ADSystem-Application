/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import {Modal} from "react-bootstrap"


// Modules
import axios from 'axios'

// Components
import TransactionForm from '../../Forms/Transactions/TransactionForm';
import DisplayItem from './DisplayItem';

export default function StockCollpaseTableRow(props){

    const[showAdd, setShowAdd] = React.useState(false)
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true)

    
    const[showRemove, setShowRemove] = React.useState(false)
    const handleCloseRemove = () => setShowRemove(false)
    const handleShowRemove = () => setShowRemove(true)

    const id = props.id
    const name = props.name
    const quantity = props.quantity

    const[showDisplayItem, setShowDisplayItem] = React.useState(false)
    const handleCloseDisplayItem = () => setShowDisplayItem(false);
    const handleShowItem = () => setShowDisplayItem(true)


    return (
        <>
        <TableRow>
            
            <TableCell>
                <button onClick={handleShowAdd}>
                    <i class='bx bx-up-arrow-circle modal-opener' style={{color:'#24fb02'}}  >
                    </i>
                </button>
                <button onClick={handleShowRemove}>
                    <i class='bx bx-down-arrow-circle modal-opener' style={{color:'#fb0202'}}  >
                    </i>
                </button>
            </TableCell>
            <TableCell><button className='modal-opener' onClick={handleShowItem}>{name}</button></TableCell>
            <TableCell>{quantity}</TableCell>

            <Modal show={showAdd} onHide={handleCloseAdd} className='insert-modal'>
                <Modal.Body className='insert-modal-body'>
                    <TransactionForm operation={"add:known"} selected_item={props.name}/>
                </Modal.Body>
            </Modal>

            <Modal show={showRemove} onHide={handleCloseRemove} className='insert-modal remove'>
                <Modal.Body className='insert-modal-body'>
                    <TransactionForm operation={"remove:known"} selected_item={props.name}/>
                </Modal.Body>
            </Modal>

            <Modal show={showDisplayItem} onHide={handleCloseDisplayItem} className='show-item-modal'>
                <Modal.Body className='insert-modal-body'>
                    <DisplayItem id={id}/>
                </Modal.Body>
            </Modal>
        </TableRow>
        </>
    )
}