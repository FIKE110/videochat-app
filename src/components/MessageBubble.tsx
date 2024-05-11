import Box from '@mui/material/Box'
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

const MessageBubble = ({sender,message}:{sender?:boolean,message:string}) => {
  return (
    <Box>
     <Card sx={{border:'none',display:'flex',justifyContent:'center',alignItems:sender ? 'flex-end' :'flex-start' }}>
        <Typography sx={{backgroundColor:sender ? '#7a1bad' : '#1f1f1f' ,
        color:'white',
        borderRadius:10,padding:'15px',width:'max-content',maxWidth:'350px'}} >
          <Box sx={{display:'flex',justifyContent:sender?'flex-start':'flex-end'}}>
            <Typography sx={{fontSize:'12px',fontWeight:'bold'}}>{sender ? 'You': 'other' }</Typography>
          </Box>
          {message}
          </Typography>    
    </Card>
    </Box>
    
  )
}

export default MessageBubble