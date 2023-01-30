//@Author: Faria-sys
//Last-update: 13/12/2022 by Faria-sys
//File description: Formulário de transações [Component]

/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, {useState} from 'react';
import '../../../assets/styles/forms/form-new-item.css'

// Components

import FormSelect from '../FormSelect';

export default function TransactionForm(props){
    const[item_name, setItemName] = useState('')
    const operation = props.operation
    const[item_quantity, setQuantity] = useState('')
    const[item_price, setPrice] = useState('')
    const[description_transaction, setDescription] = useState('')
    const[document, setDocument] = useState('')

    const create = {
        submitData(e, item_name, operation, item_quantity, description_transaction, price, document){
            axios.post("/api/data/create/transaction", {
                item_name:item_name, 
                item_quantity:item_quantity, 
                description_transaction:description_transaction, 
                price:price,
                document:document,
                operation:operation
            })
        }
    }

    
    React.useEffect(()=> {
        setItemName(props.selected_item)
    }, [])

    switch (operation) {
        case "add":
            return(
                <div className='form-style-6'>
                    <h1 className='add'>Entrada</h1>
                    <form onSubmit={(e) => create.submitData(e, item_name, operation, item_quantity, description_transaction, item_price, document)}>
        
                        <select name="item_name" required onChange={(e) => setItemName(e.target.value)}>
                            <FormSelect type={"inventory"} placeholder={"Selecione um item"}/>
                        </select>

                        <input type="number" id="item_quantity" placeholder='Quantidade' required onChange={(e) => {setQuantity(e.target.value)}}/>
                        <input type="number" id="item_price" placeholder='Preço (R$)' required onChange={(e) => {setPrice(e.target.value)}}/>
                        <input type="text" id="document" placeholder='Referente ao documento' onChange={(e) => {setDocument(e.target.value)}}/>
                        <input type="text" id="description_transaction" placeholder='Uma breve descrição... (Opcional)' onChange={(e) => {setDescription(e.target.value)}}></input>

                        <input type="submit" value="Adicionar entrada" className='add'/>
                    </form>
                </div>
            )       
        case "add:known":

            return(
                <div className='form-style-6'>
                    <h1 className='add'>Entrada</h1>
                    <form onSubmit={(e) => create.submitData(e, item_name, "add", item_quantity, description_transaction, item_price, document)}>
        
                        <input type="text" id="item_name" value={props.selected_item} required disabled blocked/>

                        <input type="number" id="item_quantity" placeholder='Quantidade' required onChange={(e) => {setQuantity(e.target.value)}}/>
                        <input type="number" id="item_price" placeholder='Preço (R$)' required onChange={(e) => {setPrice(e.target.value)}}/>
                        <input type="text" id="document" placeholder='Referente ao documento' onChange={(e) => {setDocument(e.target.value)}}/>

                        <input type="text" id="description_transaction" placeholder='Uma breve descrição... (Opcional)' onChange={(e) => {setDescription(e.target.value)}}></input>

                        <input type="submit" value="Adicionar entrada" className='add'/>
                    </form>
                </div>
            )       
        case "remove":
            return(
                <div className='form-style-6'>
                    <h1 className='remove'>Saída</h1>
                    <form onSubmit={(e) => create.submitData(e, item_name, operation, item_quantity, description_transaction, item_price, document)}>
        
                        <select name="item_name" required onChange={(e) => setItemName(e.target.value)}>
                            <FormSelect type={"inventory"} placeholder={"Selecione um item"}/>
                        </select>
        
                        <input type="number" id="item_quantity" placeholder='Quantidade' required onChange={(e) => {setQuantity(e.target.value)}}/>
                        <input type="number" id="item_price" placeholder='Preço (R$)' required onChange={(e) => {setPrice(e.target.value)}}/>

                        <input type="text" id="document" placeholder='Referente ao documento' onChange={(e) => {setDocument(e.target.value)}}/>

                        <input type="text" id="description_transaction" placeholder='Uma breve descrição... (Opcional)' onChange={(e) => {setDescription(e.target.value)}}></input>
                        
                        <input type="submit" value="Adicionar saída" className='remove'/>
                    </form>
                </div>
            )
            
        case "remove:known":  
            return(
                <div className='form-style-6'>
                    <h1 className='remove'>Saída</h1>
                    <form onSubmit={(e) => create.submitData(e, item_name, "remove", item_quantity, description_transaction, item_price, document)}>
        
                        <input type="text" id="item_name" value={props.selected_item} required disabled blocked />
        
                        <input type="number" id="item_quantity" placeholder='Quantidade' required onChange={(e) => {setQuantity(e.target.value)}}/>
                        <input type="number" id="item_price" placeholder='Preço (R$)' required onChange={(e) => {setPrice(e.target.value)}}/>

                        <input type="text" id="document" placeholder='Referente ao documento' onChange={(e) => {setDocument(e.target.value)}}/>
                        <input type="text" id="description_transaction" placeholder='Uma breve descrição... (Opcional)' onChange={(e) => {setDescription(e.target.value)}}></input>
                        
                        <input type="submit" value="Adicionar saída" className='remove'/>
                    </form>
                </div>
            )
    }
}