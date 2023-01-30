//@Author: Faria-sys

//Last-update: 13/12/2022 by Faria-sys
//File description: Página de estoque

// ** MUI Imports
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

// Components
import Sidebar from "../Menus/Sidebar";
import Header from "../Menus/Header";

import BoxDefaultDisplayTable from "../Boxes/BoxDefaultDisplayTable/BoxDefaultDisplayTable";
import SideBoxes from '../Boxes/SideBoxes/SideBoxes';

import "../../assets/styles/main.css"

export default function Stock(){
    return(
        <div className="App">
            <Header/>
            <div className="App-container">
                <Sidebar/>
                <Container className='box-container'>
                    <Grid container md={12}>
                        <Grid xs={8} item className='grid-element defaultdisplay'>
                            <BoxDefaultDisplayTable type={"stock"} class="box-display"/>
                        </Grid>

                    </Grid>

                    <Grid item xs={1} className='grid-element sidebox'>
                        <SideBoxes type={"category"}/>
                        <SideBoxes type={"department"}/>
                        <SideBoxes type={"provider"}/>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}