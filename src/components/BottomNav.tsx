import Box from '@mui/material/Box';
import EndCallIcon from '../assets/icons8-end-call-50.png'
import videoIcon from '../assets/icons8-camera-off-64.png'
import muteMicIcon from '../assets/icons8-mute-50.png'

export default function SimpleBottomNavigation({index,toggleVideo,toggleAudio}:{index:number
    ,toggleVideo:Function,
    toggleAudio:Function
}) {

  return (
    <Box sx={{ width: '100%',
    padding:1,
    zIndex:index,
    position:'fixed',bottom:20,left:0,display:'flex',justifyContent:'space-around',alignItems:'center'}}>
         <button className='call-btn' onClick={()=>toggleVideo()}>
            <img src={videoIcon} style={{width:25}}/>
        </button>
        <button style={{borderRadius:'20%',padding:15,width:80,border:'none'}}>
            <img src={EndCallIcon} style={{width:25}} />
        </button>
        <button className='call-btn' onClick={()=>toggleAudio()}>
            <img src={muteMicIcon}  style={{width:25}}/>
        </button>
    </Box>
  );
}