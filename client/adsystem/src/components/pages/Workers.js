//@Author: Faria-sys

//Last-update: 13/12/2022 by Faria-sys
//File description: Página de funcionários


// ** MUI Imports
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
// Components
import Sidebar from "../Menus/Sidebar";
import Header from "../Menus/Header";

import BoxDefaultDisplayTable from '../Boxes/BoxDefaultDisplayTable/BoxDefaultDisplayTable';

export default function Workers(){
    return (
        <div className='App'>
            <Header/>
            <div className='App-container'>
                <Sidebar/>
                <Container className='box-container'>
                    <BoxDefaultDisplayTable type="workers"/>
                </Container>
            </div>
        </div>

    )
}