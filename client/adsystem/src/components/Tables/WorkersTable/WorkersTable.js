/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

// Modules
import axios from 'axios'
import {Modal} from "react-bootstrap"


// Styles
import "../../../assets/styles/tables/tables.css"
import "../../../assets/styles/modal/modal-display-user.css"


import WorkersTableRow from './WorkersTableRow';


export default function WorkersTable(){
    const[data, setItems] = useState([])
    const[origData, setData] = useState([])

    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:"users"})
        setItems(response.data)
        setData(response.data)
    }

    useEffect(()=> {
        getItems()
    }, [])



    return(
        <>
        <table className='content-table'>
            <tr className='header-tr'>
                <th className='header-th avatar-container'></th>
                <th className='header-th'>Nome</th>
                <th className='header-th'>Email</th>
                <th className='header-th'>Departamento</th>
                <th className='header-th'>Comprador?</th>
            </tr>
            <tbody>
                {
                    data.map((item, index) => (
                        <WorkersTableRow items={item}/>
                    ))
                }
            </tbody>
        </table>

        </>
    )

}