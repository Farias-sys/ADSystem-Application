/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../lib/axios';
import React, {useState} from 'react';

// Styles
import "../../../assets/styles/forms/form-new-item.css"

export default function ApproveForm(props){
    const id = props.id
    const[observations, setObservations] = useState('')

    const create = {
        submitData(e, observations, id){
            axios.post("/api/data/shoprequest/deny", {
                row_key:id,
                observations: observations
            })
            window.location.reload()

        }
    }

    

    return(
        <div class="form-style-6"> 
            <h1>Aprovar pedido</h1>
            <form onSubmit={(e) => create.submitData(e, observations, id)}>
                <textarea id='observations' placeholder='Observações (Opcional)' onChange={(e) => {setObservations(e.target.value)}}/>
                <input type="submit" value="Enviar"/>
            </form>
        </div>
    )
}