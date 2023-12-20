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
  const [newData, setNewData] = useState({"speed":"0","current":"0","tension":"0"})
  const [dataGraph, setDataGraph] = useState([{"speed":"0","current":"0","tension":"0"}])
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
      let receiveData = `${data}#`
      let speed = receiveData.slice(data.indexOf('V') + 1, receiveData.indexOf('A'));
      let current = receiveData.slice(data.indexOf('A') + 1,receiveData.indexOf('T'));
      let tension = receiveData.slice(data.indexOf('T') + 1,receiveData.indexOf('#'));
      


      if(!isNaN(speed) && !isNaN(current)){

        setNewData(p => p = {"speed":speed,"current":current,"tension":tension})
      }else{
        console.log(receiveData)
      }

    }

    newSocket.on('connect', onConnect);
    newSocket.on('helloworldMessage', onHello);
    newSocket.on('getData', onDataReceive);

  
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(()=>{
    setDataGraph([...dataGraph,{"speed":newData.speed,"current":newData.current,"tension":newData.tension}])
  },[newData])

  useEffect(() => {
    const addDataGraph = () => {
        const integer = Math.floor(Math.random() * 1000);
        setFakeData(integer)
      };
    const intervalId = setInterval(addDataGraph, 250);

    return () => clearInterval(intervalId);
    }, []);
    
    
    useEffect(()=>{
        setData([...fakeDataList,{"sp":`${fakeData}`}].slice(-50))
        setFakeDataList([...fakeDataList,{"sp":`${fakeData}`}])
    },[fakeData])

  return (
    <section>
      <AppBarPanel cb={setNavChoice} />

      <Container maxWidth="xl" sx={{py:3}}>
      {navChoice===0 ?
      
        <DescriptionProject></DescriptionProject> :

        <ControlMotor socket={socket} fakeDataGraph={data} fulData={dataGraph} dataMotor={dataGraph.slice(-200)} ></ControlMotor>
      }
      </Container>

  </section>
  )
}export default App;


