//@Author: Faria-sys
//Last-update: 15/12/2022 by Faria-sys
//File description: Select input para os formulários interagindo com a base de dados [Component]

/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function FormSelect(props){
    const TargetDatabase = props.type

    const[data, setItems] = useState([])

    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:TargetDatabase})
        setItems(response.data)
    }

    useEffect(()=> {
        getItems()
    }, [])

    let selectPlaceholderMessage;
    switch (TargetDatabase) {
        case "measurement_units":
            selectPlaceholderMessage = "Selecione uma unidade de medida"
            break;
        case "departments":
            selectPlaceholderMessage = "Selecione um departamento"
            break;
        case "categories":
            selectPlaceholderMessage = "Selecione uma categoria"
            break;
        case "inventory":
            selectPlaceholderMessage = "Selecione um item"
            break;
        default:
            break;
    }

    function renderSwitch(parameters){
        switch (TargetDatabase) {
            case "measurement_units":
                return(data.map((item, index) => (
                    <option value={item.measurement_unit}>{item.measurement_unit}</option>
                )))
            case "departments":
                return(data.map((item, index) => (
                    <option value={item.name_department}>{item.name_department}</option>
                )))
            case "categories":
                return(data.map((item, index) => (
                    <option value={item.name_category}>{item.name_category}</option>
                )))
            case "inventory":
                return(
                data.map((item, index) => (
                    <option value={item.name_item}>{item.name_item}</option>
                )))
            case "providers":
                return(
                    data.map((item, index) => (
                        <option value={item.provider_name}>{item.provider_name}</option>
                    ))
                )
            default:
                break;
        }
    }

    return(
        <>
            <option value="" disabled selected hidden>{props.placeholder}</option>
            {
                renderSwitch(TargetDatabase)
            }
        </>
    )
}