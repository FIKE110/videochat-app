import { NavLink } from 'react-router-dom'
import '../styles/header.css'
import { Button } from '@mui/material'

type RouteType={
    name:string,
    link:string
}

export const routes:RouteType[]=[
    {name:'Home',link:"/"},
    {name:'About',link:"/about"},
    {name:'blog',link:"/blog"},
    {name:'Github',link:"https://github.com/FIKE110/videochat-app"},
]

const Header = () => {
  return (
    <header id='header'>
        <h1>VideoBuddy P2P</h1>
        <nav>
            <ul>
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