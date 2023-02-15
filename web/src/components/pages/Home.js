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
import BoxShowGraphics from "../Boxes/BoxShowGraphics/BoxShowGraphics";
import BoxShowChart from '../Boxes/BoxShowGraphics/BoxShowChart';

import "../../assets/styles/main.css"


export default function Home(){

    return(
        <div className="App">
            <Header/>
            <div className="App-container">
                <Sidebar/>
                <Container className='box-container'>
                    <div className='display-home-container'>
                    <Grid container space={3}>
                        <Grid item xs={12}>
                            <BoxDefaultDisplayTable type={"alerts"}/>
                        </Grid>
                    </Grid>
                    <Grid container space={2} spacing={12}>
                        <Grid item xs={4}>
                            <BoxShowGraphics/>
                            
                        </Grid>
                    </Grid>
                    </div>
                </Container>

            </div>

        </div>
    )
}