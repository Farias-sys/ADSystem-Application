//@Author: Faria-sys
//Last-update: 13/12/2022 by Faria-sys
//File description: Formulário de estoque [Component]

/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, {useState} from 'react';

// Styles
import "../../../assets/styles/forms/form-new-item.css"

//Modules

import FormSelect from '../FormSelect';

export default function InventoryForm(props){
    const[item_name, setItemName] = useState('')
    const[measurement_unit_item, setMeasurementUnit] = useState('')
    const[category, setCategory] = useState('')
    const[department, setDepartment] = useState('')
    const[provider, setProvider] = useState('')
    const[description, setDescription] = useState('')
    const[expiration_date, setExpirationDate] = useState()

    const[newInputsController, setNewInputsController] = useState([])
    const[usedItems, setUsedItems] = useState([])
    const[usedItemsQuantity, setUsedItemsQuantity] = useState([])

    const addInput = (e) => {
        e.preventDefault();

        setNewInputsController([... newInputsController, ""])
        setUsedItems([... usedItems, ""])
        setUsedItemsQuantity([... usedItemsQuantity, ""])
    }

    const handleChangeUsedItems = (e, index) => {
        usedItems[index] = e.target.value
        setUsedItems([... usedItems])
    }

    const handleChangeUsedItemsQuantity = (e, index) => {
        usedItemsQuantity[index] = e.target.value
        setUsedItemsQuantity([... usedItemsQuantity])
    }
    
    const create = {
        submitData(e, item_name, measurement_unit, quantity, category, department, description, usedItems, usedItemsQuantity, newInputsController, expiration_date, provider){
            axios.post("/api/data/create/inventory", {
                item_name:item_name,
                measurement_unit_item:measurement_unit,
                category:category,
                department:department,
                provider:provider,
                description:description,
                used_items_lenght:newInputsController,
                used_items:usedItems,
                used_items_quantity:usedItemsQuantity,
                expiration_date:expiration_date
            })
        }
    }

    return(
        <div class="form-style-6"> 
            <h1>Novo item</h1>
            <form onSubmit={(e) => create.submitData(e, item_name, measurement_unit_item, 0, category, department, description, usedItems, usedItemsQuantity, newInputsController.length, expiration_date, provider)}>
                <input type="text" name="item_name" placeholder="Nome do item" required onChange={(e) => {setItemName(e.target.value)}}/>
                <select name='measurement_unit' placeholder='Unidade de medida' required onChange={(e) => {setMeasurementUnit(e.target.value)}}>
                    <FormSelect type={"measurement_units"} placeholder={"Selecione uma unidade de medida"}/>
                </select>
                <select name="category" required onChange={(e) => {setCategory(e.target.value)}}>
                    <FormSelect type={"categories"} placeholder={"Selecione uma categoria"}/>
                </select>
                <select name="department" required onChange={(e) => {setDepartment(e.target.value)}}>
                    <FormSelect type={"departments"} placeholder={"Selecione um departamento"}/>
                </select>
                <select name="provider" required onChange={(e) => {setProvider(e.target.value)}}>
                    <FormSelect type={"providers"} placeholder={"Selecione um fornecedor"}/>
                </select>

                <input type={'date'} onChange={(e) => {setExpirationDate(e.target.value)}}/>

                <input type="text" id="description_transaction" placeholder='Uma breve descrição... (Opcional)' onChange={(e) => {setDescription(e.target.value)}}></input>
                <div className='container-new-inputs-header'>
                    <h2 className=''>Items utilizados (Opcional)</h2>
                    <button onClick={(e) => addInput(e)}>
                        <i class='bx bx-layer-plus' ></i>
                    </button>
                </div>
                <div className='container-new-inputs'>
                    {
                        newInputsController.map((item, index)=> (
                        <div className='new-inputs'>
                            <select onChange={(e) => {handleChangeUsedItems(e, index)}}>
                                <FormSelect type={"inventory"} placeholder={"Selecione um item"}/>
                            </select>
        
                            <input type="number" placeholder='Quantidade' onChange={(e) => {handleChangeUsedItemsQuantity(e, index)}}></input>
                        </div>
                        ))
                    }
                </div>
                
                <input type="submit" value="Adicionar"/>
            </form>
        </div>
    )
}