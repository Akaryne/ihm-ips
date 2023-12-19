import { useTheme } from "@emotion/react";
import { Box, Paper, Typography, Button, TextField,Grid,InputLabel, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { LineChart, Line,Legend, XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { CSVLink } from "react-csv";

const headers = [
    { label: "Speed", key: "speed" },
    { label: "Current", key: "current" },
  ];



function ControlMotor({socket, fakeDataGraph ,fulData, dataMotor}){
    const theme = useTheme()
    const [speed, setSpeed] = useState("")
    const [mode, setMode] = useState(0)
    const [rendement, setRendement] = useState(0)

    const csvReport = {
        data: fulData.slice(-500),
        headers: headers,
        filename: 'data_Motor.csv'
      }
    
    const handleMouvementMotor = (mode) => {
        console.log(mode)
        setMode(mode)
        socket && socket.emit("setMode",`M${mode}#`)
    }

    useEffect(()=>{
        let info = dataMotor.slice(-1)
        let speed = info[0].speed * 25 * 3.14 / 30

        let current = info[0].current / 1000

        let pIn = 24*current
        let pOut = current*0.0545*speed

        if(!isNaN(Math.round(pOut/pIn*100))){
            setRendement(Math.round(pOut/pIn*100))
        }

        
    },[dataMotor])

    return(

        <>
            <Typography variant="h4" sx={{textAlign:"left",pb:1}}>Interface de commande</Typography>
            
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={8}>
                    <Paper elevation={8} sx={{p:3,width:"100%",height:"50vh"}}>
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <Typography variant="h5" sx={{textAlign:"center"}}>Courbe vitesse moteur</Typography>
                            <Button ><CSVLink  {...csvReport}>CSV</CSVLink ></Button>
                        </Box>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataMotor} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Legend verticalAlign="top" height={0}/>

                                <XAxis dataKey="name"/>
                                <YAxis yAxisId="speed"
                                    orientation="left" domain={[0, 150]} stroke="purple"/>

                                <YAxis yAxisId="current"
                                    orientation="right" domain={[0, 380]} stroke="#008000"/>

                                <Line yAxisId="speed"
                                    type="monotone" dataKey="speed" dot={false}
                                    isAnimationActive={false} stroke="purple"/>

                                <Line yAxisId="current"
                                    type="monotone" dataKey="current" dot={false}
                                    isAnimationActive={false} stroke="#008000" />

                                
                            </LineChart>
                        </ResponsiveContainer>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={8} sx={{p:2,width:"100%", height:"100%"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Commande moteur</Typography>

                        <InputLabel htmlFor="component-speed">Vitesse</InputLabel>
                        <TextField fullWidth sx={{p:1}}
                            id="component-speed"
                            value={speed}
                            onChange={(event) => {
                                setSpeed(event.target.value);
                            }}
                        ></TextField>
                        <Button variant="contained" sx={{width:"100%",my:1, p:1}}
                            onClick={()=>{
                                socket && socket.emit("setSpeed",{"speed":speed})
                            }}
                        >Set speed</Button>

                        {mode === 2 ?
                        <Button variant="contained"  
                        sx={{width:"100%",my:1, p:1}}
                        onClick={()=>handleMouvementMotor(1)}
                        >Avant</Button>
                        :
                        <Button variant="contained"  
                        sx={{width:"100%",my:1, p:1}}
                        onClick={()=>handleMouvementMotor(2)}
                        >Arrière</Button>
                        }
                        <Button variant="contained"  
                        sx={{width:"100%",my:1, p:1}}
                                onClick={()=>handleMouvementMotor(0)}
                        >Arrêt</Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper elevation={3} sx={{p:1}}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12} sm={8}>
                                <Box>
                                    <Typography align="center" variant="h5">Chaîne énergétique</Typography>
                                    <div style={{display:"flex", padding:"16px"}}>
                                        <Paper elevation={3} sx={{ flexGrow: 1 , m:1,p:1,background:theme.palette.primary.light}}>
                                            <Typography align="center">Entrée</Typography>
                                            <Divider orientation="horizontal" variant="middle" />
                                            <Typography fontWeight={900}>Puissance : </Typography>
                                            <Typography>Tension : 24V</Typography>
                                            <Typography>{`Courant : ${dataMotor[dataMotor.length-1].current/1000}`}</Typography>
                                            <Divider orientation="horizontal" variant="middle" />
                                        </Paper>
                                        <Paper elevation={3} sx={{ flexGrow: 1 , m:1,p:1,background:theme.palette.primary.light}}>
                                           <Typography align="center">Sortie</Typography>
                                           <Divider orientation="horizontal" variant="middle" />
                                           <Typography fontWeight={900}>Puissance :</Typography>
                                           <Typography>{`Vitesse : ${dataMotor[dataMotor.length-1].speed}`}</Typography>
                                           <Typography>{`Courant : ${dataMotor[dataMotor.length-1].current/1000}`}</Typography>
                                           <Divider orientation="horizontal" variant="middle" />
                                        </Paper>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box>
                                    <Typography align="center" variant="h5">Rendement énergétique</Typography>
                                    <div style={{display:"flex", padding:"16px", justifyContent:"center"}}>
                                        <Paper elevation={3} sx={{m:1,p:3,background:theme.palette.primary.light}}>
                                            <Typography variant="h5">{`${rendement}%`}</Typography>
                                        </Paper>
                                    </div>
                                </Box>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
           
        </>
    )
}export default ControlMotor