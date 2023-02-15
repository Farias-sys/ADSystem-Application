
import React, { useEffect, useState } from 'react';

import {Modal} from "react-bootstrap"
import DisplayUser from './DisplayUsers';

export default function WorkersTableRow(props){
    const item = props.items

    const[showDisplayItem, setShowDisplayItem] = React.useState(false)
    const handleCloseDisplayItem = () => setShowDisplayItem(false);
    const handleShowItem = () => {setShowDisplayItem(true)}

    return(
        <>
        <tr key={item.index} className="content-tr workers">
            <td style={{alignItems:"center"}}><img className='avatar' src={`http://localhost:5000/uploads/${item.image_path}`}></img></td>
            <td><button className='modal-opener' onClick={(e) => handleShowItem()}>{item.real_name}</button></td>
            <td>{item.username}</td>
            <td>{item.department}</td>
            <td>{item.buyer ? "Sim" : "Não"}</td>
        </tr>

        <Modal show={showDisplayItem} onHide={handleCloseDisplayItem} className='show-item-modal'>
            <Modal.Body className='insert-modal-body'>
                <DisplayUser username={item.username}/>
            </Modal.Body>
        </Modal>
        </>
    )
}