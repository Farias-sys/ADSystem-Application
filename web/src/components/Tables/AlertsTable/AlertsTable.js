/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'

// Modules

import axios from 'axios'

//Styles
import '../../../assets/styles/cards/card-alert.css'

// Components
import AlertsCards from './AlertsCards'


export default function AlertsTable(props){
    const[data, setItems] = useState([])

    const getItems = async () => {
        const response = await axios.post('/api/data/read', {database:"alerts"})
        setItems(response.data.reverse())
    }

    useEffect(() => {
        getItems()
    }, [])

    return(
      <>
      {
        data.map((item, index) => (
          <AlertsCards id={item.id_alert} type={item.type_alert} for_date={item.for_date} for_quantity={item.for_quantity} for_product={item.for_product} for_product_id={item.for_product_id} for_measurement_unit={item.for_measurement_unit} custom_message={item.custom_message} priority={item.priority}/>
          ))
        }
      </>
    )
}