/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../lib/axios';
import React, {useState} from 'react';

// Styles
import "../../../assets/styles/forms/form-new-item.css"

//Modules

import FormSelect from '../FormSelect';

export default function ShopRequestForm(props){
    const[product_requested, setProductRequested] = useState('')
    const[measurement_unit, setMeasurementUnit] = useState('')
    const[quantity, setQuantity] = useState('')
    const[department, setDepartment] = useState('')
    const[description, setDescription] = useState('')
    const[priority, setPriority] = useState('')

    const create = {
        submitData(e, product_requested, measurement_unit, quantity, department, description, priority){
            axios.post("/api/data/create/shoprequest", {
                product_requested:product_requested,
                measurement_unit:measurement_unit,
                quantity:quantity,
                department:department,
                description:description,
                priority:priority,
            })
        }
    }

    return(
        <div class="form-style-6"> 
            <h1>Novo pedido</h1>
            <form onSubmit={(e) => create.submitData(e, product_requested, measurement_unit, quantity, department, description, priority)}>
                <select name='item_name' required onChange={(e) => {setProductRequested(e.target.value)}}>
                    <FormSelect type={"inventory"} placeholder={"Qual item deseja adquirir?"}/>
                </select>
                <select name='measurement_unit' placeholder='Unidade de medida' required onChange={(e) => {setMeasurementUnit(e.target.value)}}>
                    <FormSelect type={"measurement_units"} placeholder={"Selecione uma unidade de medida"}/>
                </select>
                <input type="number" id="item_quantity" placeholder='Quantidade' required onChange={(e) => {setQuantity(e.target.value)}}/>
                <select name="department" required onChange={(e) => {setDepartment(e.target.value)}}>
                    <FormSelect type={"departments"} placeholder={"Selecione um departamento"}/>
                </select>
                <input type="text" id="description_transaction" placeholder='Uma breve descrição... (Opcional)' onChange={(e) => {setDescription(e.target.value)}}></input>
                <select name="priority" id="priority" required onChange={(e) => {setPriority(e.target.value)}}>
                    <option value="" disabled selected hidden>Selecione a prioridade da requisição</option>
                    <option value="urgent">Urgente</option>
                    <option value="medium">Média</option>
                    <option value="normal">Normal</option>
                </select>
                <input type="submit" value="Enviar solicitação"/>
            </form>
        </div>
    )

}