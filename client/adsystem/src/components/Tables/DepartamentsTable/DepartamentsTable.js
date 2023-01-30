/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

// Modules
import axios from 'axios'

// Styles
import "../../../assets/styles/tables/tables.css"

export default function ProvidersTable(){
    const[data, setItems] = useState([])

    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:"departments"})
        setItems(response.data)
    }

    const del = {
        deleteRow(e, id_item){
            axios.post("/api/data/delete", {database:'departments', row_key:id_item})
            getItems()
        }
    }

    useEffect(()=> {
        getItems()
    }, [])

    return(
        <>
        <table class="content-table">
            <tr class="header-tr">
                <th class="header-th"></th>
                <th class="header-th">Nome</th>
            </tr>
            <tbody>
                {
                    data.map((item, index) => (
                        <tr key={item.index} className="content-tr">
                            <td>
                            <button onClick={(e) => del.deleteRow(e, item.id_department)} class="btn-options-table">
                                <i class='bx bxs-trash' ></i>
                            </button>
                            </td>
                            <td>{item.name_department}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    )
}