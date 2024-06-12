import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/header.css'
import { useDeviceSmall } from '../hooks/media'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

type RouteType={
    name:string,
    link:string,
    target?:string
}

export const routes:RouteType[]=[
    {name:'Home',link:"/"},
    {name:'About',link:"/about"},
    {name:'Blog',link:"/blog"},
    {name:'Call',link:"/call"},
    {name:'Github',link:"https://github.com/FIKE110/videochat-app",target:'_blank'},
]

const Header = () => {
    const navigate=useNavigate()
  return (
    <header id='header'>
         {useDeviceSmall() && <TemporaryDrawer />}
        <h1>VideoBuddy P2P</h1>
        <nav>
            <ul style={{display : useDeviceSmall() ?'none' : ''}}>
            {
                routes.map(link=><li style={{textDecoration:'none'}}
                ><NavLink to={link.link}
               style={({isActive})=>isActive ? { color: 'rgb(213, 1, 255)'}
                : {}}
                >{link.name}
                </NavLink></li>)
            }
            </ul>
        </nav>
        <div>
            <Button 
            style={{display : useDeviceSmall() ?'none' : ''}}
            onClick={()=>navigate("/call")}
            variant='contained'
            size='medium'
            sx={{backgroundColor:'white',color:"#7a1bad",fontWeight:'500','&:hover':{
                backgroundColor:'#7a1bad',
                color:'white'
            }}} >Get Started</Button>
        </div>
    </header>
  )
}

export default Header


function TemporaryDrawer() {

    const [open ,setOpen]=useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = ()=>{
    const navigate=useNavigate()
    return(
    <Box sx={{ width: 250,height:'100%',backgroundColor:'#7a1bad' }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {routes.map((route,index) => (
        <a style={{textDecoration:'none'}} href={route.link} target='_blank'>
          <ListItem sx={{color:'white',padding:1}} key={index} disablePadding>
            <ListItemButton onClick={()=>navigate(route.link)}>
              <ListItemText primary={route.name} />
            </ListItemButton>
          </ListItem></a>
        ))}
      </List>
    </Box>
  )}

  return (
    <div>
    <div onClick={()=>setOpen(true)}>
        <MenuIcon />
    </div>
     
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList()}
      </Drawer>
    </div>
  );
}