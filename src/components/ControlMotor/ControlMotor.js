import { useTheme } from "@emotion/react";
import { Box, Paper, Typography, Button, TextField,Grid,Item,InputLabel, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,ResponsiveContainer } from 'recharts';



function ControlMotor({socket, fakeDataGraph, dataMotor}){
    const theme = useTheme()
    const [speed, setSpeed] = useState("")

    return(

        <>
            <Typography variant="h4" sx={{textAlign:"left",pb:1}}>Interface de commande</Typography>
            
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={8}>
                    <Paper elevation={8} sx={{p:3,width:"100%",height:"50vh"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Courbe vitesse moteur</Typography>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fakeDataGraph}>
                                <Line type="monotone" dataKey="sp" isAnimationActive={false} stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 1000]}/>
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
                            placeholder="speed between 0 - 100"
                            value={speed}
                            inputProps={{pattern: "/^(?:100|[1-9]\d?|0)$/" }}
                            onChange={(event) => {
                                setSpeed(event.target.value);
                            }}
                        ></TextField>
                        <Button variant="contained" sx={{width:"100%", p:1}}
                            onClick={()=>{
                                socket && socket.emit("setSpeed",{"speed":speed})
                            }}
                        >Set speed</Button>
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
                                            <Typography>{`Courant : ${dataMotor[dataMotor.length-1].current}`}</Typography>
                                            <Divider orientation="horizontal" variant="middle" />
                                        </Paper>
                                        <Paper elevation={3} sx={{ flexGrow: 1 , m:1,p:1,background:theme.palette.primary.light}}>
                                           <Typography align="center">Sortie</Typography>
                                           <Divider orientation="horizontal" variant="middle" />
                                           <Typography fontWeight={900}>Puissance :</Typography>
                                           <Typography>{`Vitesse : ${dataMotor[dataMotor.length-1].sp}`}</Typography>
                                           <Typography>{`Courant : ${dataMotor[dataMotor.length-1].current}`}</Typography>
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
                                            <Typography variant="h5">89%</Typography>
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