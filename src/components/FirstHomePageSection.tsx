import { Box, Typography ,Button, Paper, useMediaQuery} from '@mui/material'
import P2PImage from '../assets/p2pimage4.jpeg'
import P2P2Image from '../assets/p2pimage3.jpeg'
import { useNavigate} from 'react-router-dom'
import { useDeviceSmall } from '../hooks/media'

const FirstHomePageSection = () => {
  const navigate=useNavigate()
  const smalldevices=useMediaQuery("(max-width: 800px)")
    return (
    <>
    <Box sx={{display:'flex',flexDirection: !smalldevices? 'row' : 'column',
        padding:smalldevices ? 4 : 12,paddingTop:
        useDeviceSmall() ?0 : 6
        ,gap:smalldevices ? 4 :20}} >
        <Box sx={{color:'white',flex:1,display:'flex',flexDirection:
            'column',gap:4,paddingTop:3,zIndex:2}}>
            <Typography  variant={smalldevices ? 'h4': 'h2'} 
            component='h1'>Connect with your buddy</Typography>
            <Typography>
            In today’s digital world, staying connected with friends, family, and colleagues is more important than ever. That’s why we created VideoBuddy P2P – a revolutionary platform that brings you closer to your loved ones and professional connections with unparalleled ease and security.
            </Typography>
            <Paper sx={{backgroundColor:'transparent',width:'max-content'}}>
            <Button
            onClick={()=>navigate("/call")}
          //  onClick={()=>navigation.location="/call"}
            variant='contained'
            size='medium'
            sx={{backgroundColor:'white',color:"#7a1bad",fontWeight:'500','&:hover':{
                backgroundColor:'#7a1bad',
                color:'white'
            }}} >Start a call now</Button></Paper>
        </Box>
        <Box sx={{flex:1,display:'flex',paddingLeft:0}}>
            <Box sx={{width:smalldevices? "100%" :'83%',backgroundColor:'#7a1bad'}}>
               <img src={P2P2Image} style={{borderRadius:20,width:'100%',
                height:'auto'}}/>
            </Box>
        </Box>
    </Box>
    <Box sx={{display:'flex', 
    height:'wrap-content',
    padding:useDeviceSmall() ? 0 : 12,gap:smalldevices ? 4 :10,
        paddingTop:3,flexDirection: !smalldevices? 'row' : 'column-reverse'}} >
        <Box sx={{flex:1,display:'flex'}}>
            <Box sx={{width:useDeviceSmall() ? '100vw' :'83%',
                backgroundColor:'#7a1bad'}}>
               <img src={P2PImage} style={{borderRadius:useDeviceSmall()
                ? 0 : 20,width:'100%',height:'auto'}}/>
            </Box>
        </Box>
        <Box sx={{color:'white',flex:1,
            padding:smalldevices? 4 : 0,
            display:'flex',flexDirection:'column',gap:4,paddingTop:3}}>
            <Typography variant={smalldevices ? 'h4': 'h2'}  component='h1'>What is VideoBuddy P2P?</Typography>
            <Typography>VideoBuddy P2P is a cutting-edge peer-to-peer (P2P) 
                video communication platform designed to provide you with the most private and 
                seamless online conversation experience. 
                Unlike traditional video chat services that route your data through centralized servers,
                 VideoBuddy P2P connects you directly to the person you're talking to, ensuring that your 
                 conversations remain confidential and secure.</Typography>
        </Box>
    </Box>
    </>
  )
}

export default FirstHomePageSection