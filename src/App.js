import React,{useState, useEffect} from 'react'
import {Button, Container} from '@mui/material';
import io from 'socket.io-client';


import AppBarPanel from './components/AppBarPanel'
import ControlMotor from './components/ControlMotor/ControlMotor';
import DescriptionProject from './components/DescriptionProject/DescriptionProject';

import { useTheme } from '@mui/material/styles';



function App() {
  const theme = useTheme();

  const [navChoice,setNavChoice] = useState(0)
  const [socket, setSocket] = useState()
  const [dataGraph, setDataGraph] = useState([{"sp":"40","current":"0,24"}])
  const [fakeData,setFakeData] = useState(0)
  const [fakeDataList,setFakeDataList] = useState([])
  const [data, setData] = useState([])
  const host = "192.168.228.189"
  const port = "8080"

  useEffect(() => {
    const newSocket = io(`http://${host}:${port}`); 

    function onConnect() {
      setSocket(newSocket)
    }

    function onHello(data){
      console.log(data)
    }

    function onDataReceive(data){

      let speed = data.slice(data.indexOf('V')+1, data.indexOf('V') + 1 + 3 );
      let current = data.slice(data.indexOf('A') + 1,data.indexOf('A') + 1 + 3);

      setDataGraph([...dataGraph,{"sp":speed,"current":current}])
    }

    newSocket.on('connect', onConnect);
    newSocket.on('helloworldMessage', onHello);
    newSocket.on('getData', onDataReceive);

  
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const addDataGraph = () => {
        const integer = Math.floor(Math.random() * 1000);
        setFakeData(integer)
      };
    const intervalId = setInterval(addDataGraph, 250);

    return () => clearInterval(intervalId);
    }, []);
    
    
    useEffect(()=>{
        setData([...fakeDataList,{"sp":`${fakeData}`}].slice(-30))
        setFakeDataList([...fakeDataList,{"sp":`${fakeData}`}])
    },[fakeData])


  return (
    <section>
      <AppBarPanel cb={setNavChoice} />

      <Container maxWidth="xl" sx={{py:3}}>
      {navChoice===0 ?
      
        <DescriptionProject></DescriptionProject> :

        <ControlMotor socket={socket} fakeDataGraph={data} dataMotor={dataGraph} ></ControlMotor>
      }
      </Container>

  </section>
  )
}export default App;


