//@Author: Faria-sys

//Last-update: 13/12/2022 by Faria-sys
//File description: Dashboard inicial


// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Container } from '@mui/material';

// Components

import Sidebar from "../Menus/Sidebar";
import Header from "../Menus/Header";

import BoxDefaultDisplayTable from "../Boxes/BoxDefaultDisplayTable/BoxDefaultDisplayTable";

import "../../assets/styles/main.css"

export default function Configs(){
    return(
        <div className='App'>
            <Header/>
            <div className='App-container'>
                <Sidebar/>
                <Container className='box-container'>
                    <Grid container space={3}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                                                
                            </Grid>                           
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}