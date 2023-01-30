/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../assets/styles/boxdisplay/BoxGraphic.css"
import * as React from 'react';
import { Link } from "react-router-dom" 
import Typography from '@mui/material/Typography';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

import BoxShowChart from "./BoxShowChart"
import axios from "axios";

export default function BoxShowGraphics(props){
    
    function preventDefault(event) {
      event.preventDefault();
    }

    const[expense, setExpense] = React.useState(0)
    const getData = async () => {
        const response = await axios.post('/api/data/read/getexpenses', {type:'all'})
        setExpense(response.data.expenses)
    }


    React.useEffect(()=> {
        getData()
    }, [])

    const date = new Date()
    const monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")

    return(
        <div className="container graphic">
            <div className='container-header'>
                <div className="container-title">Gastos</div>
            </div>

            <div className="container-content graphics">


                <div className="container-charts">
                    <div className="text-expenses-card">   
                        <div className="text-expenses-container">
                            <h2 id="total-expenses">Total:</h2>
                            <h3 id="total-expenses">{expense.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h3>                          
                            <h2 id="today-date">Dia {date.getDate()} de {monName[date.getMonth()]} , {date.getFullYear()}</h2>
                            <div className="expenses-container-button">
                                <Link id="see-transactions" to='/transactions'>
                                    Visualizar transações
                                </Link>
                            </div>
                        </div>

                    </div>

                    <BoxShowChart/>
                </div>
            </div>
            <div className="container-orange"></div>
        </div>
    )
}