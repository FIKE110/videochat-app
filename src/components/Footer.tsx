import { Box, Typography, Link,Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MailIcon from '@mui/icons-material/Mail';
import GitHub from '@mui/icons-material/GitHub';
import FaceBookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/X'
import { routes } from './Header';
import { NavLink } from 'react-router-dom';
import { useDeviceSmall } from '../hooks/media';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#7a1bad',
    color: 'white',
    padding:useDeviceSmall() ? 0 :20,
    marginTop:'30px',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  link: {
    color: 'white',
    '&:hover': {
      color: '#d1c4e9',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Box>
        <Box sx={{display:'flex',flexDirection:useDeviceSmall() ? 'column' : 'row',justifyContent:'center',alignItems:'center'}}>
          <Typography variant='h5'>Subscribe to our new letter to get update</Typography>
          <Box sx={{height:"30px",padding:6,display:'flex',
          gap:1
          ,
          flexDirection:useDeviceSmall()? 'column':'row'
          ,justifyContent:'center',alignItems:'center'}}>
            <input type='email' placeholder='Enter your email address' 
            style={{width:'300px',padding:10,paddingLeft:20,outline:'none'}}/>
            <Button variant='contained' sx={{color:'#7a1bad',
            '&:hover':{
              color:'white',
              background:'#7a1bad'
            },
            backgroundColor:'white',height:'40px'}}>Subscribe</Button>
          </Box>
        </Box>
        <Box sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
          <Box sx={{display:'flex',gap:3}}>
            <MailIcon />
            <FaceBookIcon />
            <TwitterIcon />
            <GitHub />
          </Box>
          <Box>
            <Typography>Links</Typography>
            <ul style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',marginBottom:30}}>
            {routes.map(link=><li style={{listStyle:'none',padding:10}}>
              <NavLink
              style={({isActive})=>({textDecoration:'none',color:isActive ? 'rgb(213, 1, 255)':'white'})}
              to={link.link}>{link.name}</NavLink></li>)}
            </ul>
          </Box>
        </Box>
      </Box>
      <Typography variant="body2">
        © {new Date().getFullYear()} P2P Chat App. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="/terms"  className={classes.link}>
        Terms of Service</Link> | <Link href="/privacy" className={classes.link}>Privacy Policy</Link>
      </Typography>
      <Typography variant='body2' sx={{paddingTop:3}}>Created by Chihurum Ikechukwu Fortune</Typography>
    </Box>
  );
};

export default Footer;
