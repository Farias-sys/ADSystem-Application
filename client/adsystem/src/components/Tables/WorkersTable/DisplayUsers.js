/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

// Modules
import axios from 'axios'

export default function DisplayUser(props){
    const id = props.username

    const[user_data, setUserData] = useState([])
    const[user_last_transactions, setUserLastTransactions] = useState([])

    const getData = async () => {
        const response_user = await axios.post('/api/data/read', {database:"users:specific", username:id})
        const response_transactions = await axios.post('/api/data/read', {database:"transactions:specific:user", username:id})

        setUserData(response_user.data)
        setUserLastTransactions(response_transactions.data)
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

    const[whatItemToShow, setItemToShow] = React.useState(false)

    const showTransactions = () => {
        return(
            <table className='display-item'>
                <thead className='display-item'>
                    <th></th>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                </thead>
                <tbody className='display-item'>
                    {
                        user_last_transactions.map((item, index) => (
                            <tr key={item.index} className='display-item content-tr'>
                                <td>{renderSwitchMessageOperation(item.type_operation_transaction)}</td>
                                <td className='display-item'>{item.item_name}</td>
                                <td className='display-item'>{item.id_transaction}</td>
                                <td className='display-item'>{item.item_quantity} ({item.item_measurement_type})</td>
                                <td className='display-item'>{item.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    return(
        <div className='display-user'>
            <h1 className='display-user'>{user_data.real_name} : {user_data.username}</h1>
            <div className='display-user-body'>
                <img className='display-user' src={"http://localhost:5000/uploads/" + user_data.image_path}></img>

                <div className='content-display-user'>
                <div className='content-display-user-btns'>
                        <button className='btn-alternate-display-user' onClick={() => setItemToShow(true)}>Últimas transações</button>
                    </div>
                    <div className='content-page'>
                        {showTransactions()}
                    </div>
                </div>
            </div>
        </div>
    )
}