/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



// Modules
import axios from 'axios'
import StockCollpaseTableRow from './StockCollapseTableRow';

const arrow_down = () => {return(<i class='bx bxs-down-arrow-square' ></i>)}
const arrow_left = () => {return(<i class='bx bxs-right-arrow-square' ></i>)}

export default function StockTableRow(props){
    const [open, setOpen] = React.useState(true);

    const[data, setData] = React.useState([])

    const getData = async () => {
        const response = await axios.post('/api/data/read', {database:"inventory:category", category:props.category})
        setData(response.data)
    }

    React.useEffect(()=> {
        getData()
    }, [])

    function renderConditional(data){
        if(data==0){
            return(
                <Box sx={{ margin: 1}} className="box-no-data-return">
                    Nenhum item cadastrado nessa categoria
                </Box>
            )
        } else {
            return(
                <Box sx={{ margin: 1}}>
    
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome do item</TableCell>
                            <TableCell>Quantidade</TableCell>
                        </TableRow>
    
                    </TableHead>
                    <TableBody>
                        {
                            data.map((item, index) => (
                                <StockCollpaseTableRow id={item.id_item} name={item.name_item} quantity={item.quantity}/>
                                ))
                        }
                    </TableBody>
    
                </Table>
            </Box>
            )
        }
    }

    return(
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={"category-head"}>
                <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}>
                {open ? arrow_down() : arrow_left()}
                </IconButton>
                </TableCell>

                <TableCell component={"th"} scope="row" style={{paddingTop: 0, paddingBottom: 0}} className={"category-head"}>
                    {props.category}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {renderConditional(data)}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}