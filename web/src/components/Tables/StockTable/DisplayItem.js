/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

// Modules
import axios from '../../../lib/axios'

// Styles
import "../../../assets/styles/modal/modal-display-inventory-item.css"

// QRCODE EXAMPLE IMAGE
import QRCode from "react-qr-code";


// Components
import FormSelect from '../../Forms/FormSelect';

export default function DisplayItem(props){
    const id = props.id

    const[item_data, setItemData] = useState([])
    const[item_last_transactions, setItemLastTransactions] = useState([])

    const getData = async () => {
            const response_inventory = await axios.post("/api/data/read", {database:"inventory:specific", id:id})
            const response_transactions = await axios.post("/api/data/read", {database:"transactions:specific", id:id})

            setItemData(response_inventory.data)
            setItemLastTransactions(response_transactions.data)
        }

    useEffect(()=> {
        getData()
    }, [])

    function renderSwitchMessageOperation(type){
        switch (type) {
            case "remove":
                return(<i class='bx bx-up-arrow-circle' style={{color:'#ce0000'}}></i>)
            case "add":
                return(<i class='bx bx-down-arrow-circle' style={{color:'#00f145'}} ></i>)
            default:
                break;
        }
    }

    function renderConditionalUsedItems(used_items){
        if(used_items != undefined){
            if(used_items.lenght > 0){
                return(
                    <div className='container-new-inputs-header'>
                        <h2 className=''>Items utilizados</h2>
                        
                        {
                            used_items.map((item, index) => {
                                <h2>{item.items}</h2>
                            })
                        }
                    </div>
                )
            }
        }
    }

    /* Handling inputs for update data of item ========================================== */

    
    const[whatItemToShow, setItemToShow] = React.useState(false)
    const showTransactions = () => {
        return(
            <table className='display-item'>
            <thead className='display-item'>
                <th></th>
                <th>ID</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Usuário</th>
            </thead>
            <tbody className='display-item'>
                    {
                        item_last_transactions.map((item, index) => (
                            <tr key={item.index} className='display-item content-tr'>
                                <td>{renderSwitchMessageOperation(item.type_operation_transaction)}</td>
                                <td className='display-item'>{item.id_transaction}</td>
                                <td className='display-item'>{item.quantity} ({item.item_measurement_type})</td>
                                <td className='display-item'>{item.price}</td>
                                <td className='display-item'>{item.added_by}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    const[item_name, setItemName] = React.useState(null)
    const[category, setCategory] = React.useState(null)
    const[department, setDepartment] = React.useState(null)
    const[provider, setProvider] = React.useState(null)
    const[description, setDescription] = React.useState(null)
    const[expiration_date, setExpirationDate] = React.useState(null)

    const update = {
        submitData(e, item_name, category, department, description, expiration_date,provider){
            axios.post('/api/data/update/inventory', {
                id_item:id,
                item_name:item_name,
                category:category,
                department:department,
                description:description,
                provider:provider,
                expiration_date:expiration_date
            })
        }
    }
    const showInformations = () => {
        return(
            <div className={'container-form-display-item'}>
            <form className='form-style-6 display-item-form' onSubmit={(e) => {update.submitData(e, item_name, category, department, description, expiration_date,provider)}}>
                <input type="number" className='disabled' name="item_id" placeholder={`ID: ${item_data.id_item}`} blocked disabled/>
                <input type="text" name="item_name" placeholder={item_data.name_item} onChange={(e) => {setItemName(e.target.value)}} />
                <input type="text" name="item_measurement_unit" value={item_data.measurement_unit_item} blocked disabled/>
                <input type="number" id="item_quantity" placeholder={`Quantidade em estoque: ${item_data.quantity}`} required blocked disabled/>
                <select name="category"  onChange={(e) => {setCategory(e.target.value)}}>
                    <FormSelect type={"categories"} placeholder={`Categoria atual: ${item_data.category}`}/>
                </select>
                <select name="department"  onChange={(e) => {setDepartment(e.target.value)}}>
                    <FormSelect type={"departments"} placeholder={`Departamento atual: ${item_data.department}`}/>
                </select>
                <select name="provider" onChange={(e)=>{setProvider(e.target.value)}}>
                    <FormSelect type={"providers"} placeholder={`Fornecedor atual: ${item_data.provider}`}/>

                </select>
                <h2>Data de vencimento</h2>
                <input type={'date'} onChange={(e) => {setExpirationDate(e.target.value)}}/>

                <input type="text" id="description_transaction" value={`${item_data.description}`}  onChange={(e) => {setDescription(e.target.value)}}></input>
                {/* {renderConditionalUsedItems(item_data.used_items)} */}
                <input type={"submit"} id="submit" value={"Atualizar informações"} />
            </form>
        </div>
        )
    }

    const value_qr_code = `Nome do produto: ${item_data.name_item}\n Quantidade em estoque: ${item_data.quantity}`

    return(
        <div className='display-item'>
            <h1 className='display-item'>{item_data.id_item} : {item_data.name_item}</h1>
            <div className='display-item-body'>
                <div style={{ height: "auto", margin: "1rem auto", maxWidth: 200, width: "100%" }}>
                    <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value_qr_code}
                    viewBox={`0 0 256 256`}
                    />
                </div>

                <div className='content-display-item'>
                    <div className='content-display-item-btns'>
                        <button className='btn-alternate-display-item' onClick={() => setItemToShow(false)}>Informações</button>
                        <button className='btn-alternate-display-item' onClick={() => setItemToShow(true)}>Últimas transações</button>
                    </div>
                    <div className='content-page'>
                        {whatItemToShow ? showTransactions() : showInformations()}
                    </div>
                </div>
            </div>

        </div>
    )

}
