import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { AreaChart,Area,Label, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Container } from '@mui/material';
import axios from '../../../lib/axios';

import '../../../assets/styles/boxdisplay/BoxGraphic.css'

export default function Chart() {
    function createData(time, amount) {
        return { time, amount };
    }

    const[data, setData] = React.useState([])
    const getData = async () => {
        const response = await axios.post('/api/data/read/getexpenses', {type:'by'})
        setData(response.data)
    }

    React.useEffect(()=> {
        getData()
    }, [])
    
    
    const theme = useTheme()

    return (
    <>
        <div className='container-content graphics chart'>
            <AreaChart width={950} height={225} data={data} margin={{ top: 5, right:20, bottom: 5, left: 15 }}>
                <Area type="monotone" dataKey="Gastos" stroke="#8884d8" />
                <Label>Ok</Label>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis stroke={theme.palette.text.secondary}
                style={theme.typography.body2}>
                <Label
                    angle={270}
                    position="left"
                    style={{
                        textAnchor: 'middle',
                        fill: theme.palette.text.primary,
                        ...theme.typography.body1,
                    }}
                    >
              Gastos (R$)
            </Label>
                </YAxis>
                <Tooltip />
            </AreaChart>
        </div>
    
    </>
    );
  }