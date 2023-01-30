import DisplayItem from "../StockTable/DisplayItem"
import * as React from 'react';

import {Modal} from "react-bootstrap"
import axios from 'axios'

const del = {
    deleteRow(e, item_id){
        axios.post("/api/data/delete", {database:'alerts', row_key:item_id})
        window.location.reload()
    }
}

export default function AlertsTableRow(props){
    function buildAlert(type, for_date, for_quantity, for_product, for_measurement_unit, custom_message, priority){
        let message;
        
        switch (type) {
            case "product_quantity":
                message = "Seu estoque de " + for_product + " está menor do que a quantidade mínima definida ( " + for_quantity + " " + for_measurement_unit + " )"
                priority = priority
                break;
            case "product_expired":
                message = custom_message
                priority = priority
                break;
            default:

                break;
        }
  
        return{"message":message, "priority":priority}
    }
    
    const alert = buildAlert(props.type, props.for_date, props.for_quantity, props.for_product, props.for_measurement_unit, props.custom_message, props.priority)
    const message = alert.message
    const priority = props.priority

    let color;

    switch (priority) {
        case "urgent":
            color = "red";
            break;
        case "normal":
            color = "orange";
            break;
        default:
            break;
    }

    const[showDisplayItem, setShowDisplayItem] = React.useState(false)
    const handleCloseDisplayItem = () => setShowDisplayItem(false);
    const handleShowItem = () => setShowDisplayItem(true)

    return(
        <>
            <div className="card-alert">
            <p className="card-name"><button className="modal-opener" onClick={handleShowItem}>{message}</button></p>
            <div className="card-flex">
                <p className="card-actions">
                    <button onClick={(e) => del.deleteRow(e, props.id)}>
                        <i class='bx bx-check-circle' style={{color:'#23EF04'}}  ></i>
                    </button>
                </p>
                <div
                className="card-box"
                 style={{ backgroundColor:color }} 
                ></div>
            </div>
            </div>

            <Modal show={showDisplayItem} onHide={handleCloseDisplayItem} className='show-item-modal'>
                <Modal.Body className='insert-modal-body'>
                    <DisplayItem id={props.for_product_id}/>
                </Modal.Body>
            </Modal>
        
        </>

        
    )

}