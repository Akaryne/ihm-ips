import { useTheme } from "@emotion/react";
import { Box, Paper, Typography, Button, TextField,Grid,Item,InputLabel, Divider } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import React from "react";


function DescriptionProject(){

    const theme = useTheme()


    return(
        <>
        <Typography variant="h4" sx={{textAlign:"center",m:2}}>Présentation projet</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12}>  
                <Box p={2} >
                    <Typography textAlign="center" variant="body1">Dans le cadre de notre cursus en école d'ingénieur, nous avons travaillé 
                    sur un projet portant sur la conception d'une carte électronique destinée au contrôle d'un moteur à courant continu, 
                    ainsi que sur le calcul du rendement du moteur en temps réel.</Typography>
                </Box>
                
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h5" sx={{textDecoration:"underline"}}>Conception système de mesure</Typography>
                <Box p={1}>
                    <Typography variant="body1">La première étape de notre projet s'est concentrée
                    sur la mise en place d'un système de mesure robuste. Dans ce chapitre, nous explorerons
                    les choix conceptuels et les considérations techniques qui ont conduit à la création de notre
                    dispositif. 
                    <br/><br/> 
                    L'objectif de ce PCB est de calculer le courant en utilisant une résistance shunt de 0,05 ohm. La tension sur la résistance shunt étant très faible, nous avons utilisé un amplificateur AD623 pour augmenter cette valeur, permettant ainsi au microcontrôleur STM32 de lire la tension sur la résistance. De plus, nous avons intégré un filtre passe-bas pour éliminer les fréquences supérieures à 1 kHz et réduire les perturbations.
                    En utilisant l'AD623, il était nécessaire de calculer la résistance de gain en utilisant la formule G = 1 + (100k/Rg). Avec un gain de 50, nous avons obtenu une résistance de gain de 2k ohms.
                    <br/><br/> 
                    Pour l'intégration du STM32, nous avons opté pour le style Morpho (l’embase Morpho). Un plan de masse a été mis en place sur l'ensemble du PCB. Après des tests préliminaires sur une plaque à trous et avec LTSPICE, nous avons procédé à l'impression du PCB.
                    Lors du soudage des composants, nous avons pris soin d'utiliser un support tulipe pour l'AD623. Ceci permet de remplacer facilement l'AD623 en cas de dommage, sans avoir à dessouder l'ensemble du PCB.
                    <br/><br/> 
                       </Typography>
                       <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{width:"100%",height:"400px"}}>
                                    <img src={`${process.env.PUBLIC_URL}/img/photo_1.JPEG`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                    alt={"PCB"}></img>
                                    <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>PCB</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{width:"100%",height:"400px"}}>
                                <img src={`${process.env.PUBLIC_URL}/img/photo_3.JPEG`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                alt={"Plaque à trou"}></img>
                                <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>Plaque à trou</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{width:"100%",height:"300px"}}>
                                    <img src={`${process.env.PUBLIC_URL}/img/photo_2.JPG`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                    alt={"CAO électronique"}></img>
                                    <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>CAO électronique</Typography>
                                </Box>
                            </Grid>
                       </Grid>
                </Box>
   
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h5" sx={{textDecoration:"underline"}}>Etude Mécanique</Typography>
                <Box p={1}>
                    <Typography variant="body1">Une compréhension de la mécanique du système est indispensable pour garantir des performances optimales lors de l'asservissement. Pour cela nous devons obtenir les paramètres physiques essentiels et les prendre compte dans l'asservissement et modélisation.
                        Nous avons réalisé une série d ‘éxpériences pour dont voici la liste : <br/><br />
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Tension nominal : <b>24V</b> Fourni par le constructeur <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Vitesse à vide : <b>3000 rpm</b> Frouni par le constructeur <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Résistance (R) : <b>19 ohm</b> Mesurer à l’aide d’un multimètre et retenir la plus petite valeur de résistance lorsque l’on tourne le moteur a la main. <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Inductance (L) : <b>1 mH</b> Obtenue à partir de la constante de temps L/R que nous pouvons observer avec un oscilloscope. Nous générons un signal carré de 1 kHz pour impulser le moteur. <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Constante de temps électrique :  <b>0.225s</b> Observé à partir de la réponse du moteur. On a mesuré le courant pendant l'accélération du moteur et, puis, on a calculé le temps. <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Constant de couple : <b>0.0764 N*m/A</b> On l’a estimée en utilisant la formule Vnom/ѡ0 (Suppositionque la friction est négligeable) <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Constant électrique : <b>0.0764 V*s/rad</b> Méthode d’obtention: Même valeur numérique que la constante de couple (enunités SI) <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Contant de temps mécanique : <b>0.2s</b> En mesurant la vitesse et en déterminant le temps nécessaire pour atteindre 63% de la vitesse finale <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Inertie du rotor : <b>3.1266e-5 kg*m²</b> On a estimé l’inertie du rotor à partir des mesures de la
                            constante de temps mécanique et R <br/>
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Coefficient d’amortissement visqueux : <b>6.28e-5 N*s/rad</b> Estimé à partir des équations mécanique et électrique dumoteur en régime stable <br/>

                      
                      </Typography>
                      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{width:"100%",height:"200px"}}>
                                <img src={`${process.env.PUBLIC_URL}/img/model_motor.JPEG`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                alt={"Courbe Mecanique"}></img>
                                <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>Diagramme moteur</Typography>
                                </Box>
                            </Grid>
                       </Grid>
                </Box>

            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h5" sx={{textDecoration:"underline"}}>Implémentation STM32</Typography>
                <Box p={1}>
                    <Typography variant="body1">L'intégration du microcontrôleur STM32 a été une étape déterminante
                        dans le développement de notre projet. Nous allons expliqué les choix de conception
                       autour de l'asservissement et acquisition des mesurandes du système.
                       <br />
                       Correcteur PI : À l'aide de l'encodeur, nous obtenons la vitesse instantanée. 
                       Nous calculons ensuite l'erreur, puis effectuons les calculs de l'asservissement à l'aide du diagramme ci-dessous (cf PI).
                        Ensuite, nous calculons le rapport cyclique du signal PWM à envoyer au hacheur.
                       <br />
                       Parmi les entrées, nous convertissons la tension (représentant le courant) en sortie de l'AOP à l'aide d'un CAN 12 bits.
                        Pour mesurer la vitesse, nous utilisons les encodeurs.
                        <br />

                       </Typography>
                       <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{width:"100%",height:"300px"}}>
                                    <img src={`${process.env.PUBLIC_URL}/img/correcteur_pi.png`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                    alt={"Correcteur PI"}></img>
                                    <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>Correcteur PI</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{width:"100%",height:"250px"}}>
                                    <img src={`${process.env.PUBLIC_URL}/img/PID.JPEG`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                    alt={"Encodeur"}></img>
                                    <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>PI</Typography>
                                </Box>
                            </Grid>
                       </Grid>
                </Box>
  
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h5" sx={{textDecoration:"underline"}}>Conception IHM</Typography>
                <Box p={1}>
                    <Typography variant="body1">

                        L'interface homme-machine (IHM) joue un rôle central dans l'interaction avec notre système. Nous avons 3 parties au sein de cette IHM. <br /><br />
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Le bloc de gauche affiche la courbe de la vitesse ainsi que le courant en temps réel. et l'option d'exporter en csv les courbes<br />
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Le bloc de droite sert aux commandes du moteur, ainsi l'utilisateur peut varier la vitesse et le sens du moteur : avant, arrière, arrêt. <br />
                        <CircleIcon fontSize="small" sx={{ pt:"5px"}}/>Et pour finir, le bloc du bas, nous avons la chaîne d'énergie du moteur. <br /><br />
                        Nous pouvons avoir l'IHM dans la partie : "PANEL MOTEUR"
                    
                    </Typography>
                     <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1}}>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{width:"100%",height:"400px"}}>
                                <img src={`${process.env.PUBLIC_URL}/img/ihm.png`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                alt={"IHM"}></img>
                                <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>Ihm</Typography>
                                </Box>
                            </Grid>
                       </Grid>
                </Box>

            </Grid>
            <Grid item xs={12} sm={12}>
                <Typography variant="h5" sx={{textDecoration:"underline"}}>Résultats obtenus</Typography>
                <Box p={1}>
                    <Typography variant="body1">La mise en œuvre pratique de notre conception a abouti à des résultats concrets et mesurables.
                     À l'aide des courbes capturées par l'IHM, nous pouvons établir une courbe "pratique" et une courbe "théorique" obtenues grâce à la simulation de la partie mécanique :
                     </Typography>
                     <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:1,mb:3}}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{width:"100%",height:"400px"}}>
                                    <img src={`${process.env.PUBLIC_URL}/img/vitesse_reel.png`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                    alt={"Moteur sans charge"}></img>
                                    <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>Moteur sans charge</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{width:"100%",height:"400px"}}>
                                    <img src={`${process.env.PUBLIC_URL}/img/courbe_simu.JPEG`} width={"100%"} height={"100%"} style={{objectFit:"contain"}}
                                    alt={"Simulation sans charge"}></img>
                                    <Typography variant="body2" fontStyle={"italic"} textAlign={"center"}>Simulation sans charge</Typography>
                                </Box>
                            </Grid>
                       </Grid>
                       <Typography variant="body1">
                        <br />À partir de ces résultats, nous pouvons affirmer que le modèle mécanique est semblable au modèle réel. En effet, le moteur met 4 secondes pour atteindre la consigne, tandis que la simulation prend 4.5 secondes pour atteindre la même consigne.
                         Cependant, la différence peut être due à plusieurs facteurs tels que la mesure de la résistance, pour laquelle nous avons obtenu une grande plage de valeurs.
                        L'inertie, qui influence le temps d'accélération du modèle dynamique, constitue un autre aspect à considérer. Des erreurs dans la modélisation de l'inertie peuvent contribuer aux variations observées entre le comportement simulé et la réalité.
                        Un deuxième problème lié à la simulation réelle concerne le temps d'échantillonnage, qui pourrait être amélioré pour obtenir des résultats plus précis. Il est crucial d'optimiser ce paramètre afin d'assurer une représentation plus fidèle des performances du système dans la réalité.
                        </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Paper sx={{background:theme.palette.primary.light, mt:4}}>
                    <Typography align="center" variant="h4" fontWeight={700} pt={2}>CONCLUSION</Typography>
                    <Box p={2}>
                        <Typography variant="body1">En résumé, notre projet a abouti à la conception réussie d'un système de contrôle électronique
                         pour un moteur à courant continu.
                         Nous avons acquis de nouvelles compétences en électronique de puissance et appris à utiliser des technologies comme Eagle. 
                         Travailler en équipe a été une expérience enrichissante, renforçant notre collaboration et notre capacité à travailler ensemble. 
                         De plus, le projet nous a rendus plus autonomes dans la résolution de problèmes complexes.
                         <br />
                        </Typography>
                        <Box sx={{width:"100%",height:"600px",p:2, display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <video width="100%" height="100%" controls >
                                <source src={`${process.env.PUBLIC_URL}/img/photo_6.mp4`} type="video/mp4"/>
                            </video>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}export default DescriptionProject