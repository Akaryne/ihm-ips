import { useTheme } from "@emotion/react";
import { Box, Paper, Typography, Button, TextField,Grid,Item,InputLabel, Divider } from "@mui/material";
import React from "react";


function DescriptionProject(){

    const theme = useTheme()

    return(
        <>
        <Typography variant="h4" sx={{textAlign:"left",m:2}}>Présentation projet</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6}>  
                <Typography variant="h6" sx={{textDecoration:"underline"}}>Cahier des charges</Typography>
                <Box p={1}>
                    <Typography variant="body2">Test</Typography>
                    <Typography variant="body2">Dans le cadre de notre cursus en école d'ingénieur, nous avons...</Typography>
                </Box>
                
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{textDecoration:"underline"}}>Etude Mécanique</Typography>
                <Box p={1}>
                    <Typography variant="body2">Test</Typography>
                </Box>

            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{textDecoration:"underline"}}>Conception électronique</Typography>
                <Box p={1}>
                    <Typography variant="body2">Test</Typography>
                </Box>
   
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{textDecoration:"underline"}}>Implémentation STM32</Typography>
                <Box p={1}>
                    <Typography variant="body2">Test</Typography>
                </Box>
  
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{textDecoration:"underline"}}>Conception IHM</Typography>
                <Box p={1}>
                    <Typography variant="body2">Test</Typography>
                </Box>

            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{textDecoration:"underline"}}>Expérimentation</Typography>
                <Box p={1}>
                    <Typography variant="body2">Test</Typography>
                </Box>

            </Grid>

            <Grid item xs={12} sm={12}>
                <Paper sx={{background:theme.palette.primary.light}}>
                    <Typography align="center" variant="h6" fontWeight={700} >CONCLUSION</Typography>
                    <Box p={2}>
                        <Typography variant="body2">Ce projet a été</Typography>
                    </Box>

                </Paper>

            </Grid>
        </Grid>
        </>
    )
}export default DescriptionProject