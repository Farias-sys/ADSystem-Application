/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Modules
import axios from 'axios'

// Styles
import "../../../assets/styles/tables/stock-table.css"

// Components

import StockTableRow from "./StockTableRow"


export default function StockTable(){
    const[categories, setCategories] = React.useState([])

    const getCategories = async () => {
        const response = await axios.post('/api/data/read', {database:"categories"})
        setCategories(response.data)
    }

    React.useEffect(()=> {
        getCategories()
    }, [])

    return(
        <TableContainer component={Paper} className={'collapse-table-container'}>
            <Table aria-label="collapsible table" className='collapse-main-table'>
                <TableHead className='collapse-main-head'>
                    <TableRow>
                    </TableRow>
                </TableHead>
            </Table>
            <TableBody className='collapse-main-body'>
                {
                    categories.map((item, index) => (
                        <StockTableRow category={item.name_category}/>
                    ))
                }
            </TableBody>
        </TableContainer>
    )
}