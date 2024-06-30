import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Textarea from '@mui/joy/Textarea'
import '../styles/chat-box.css'
import MessageBubble from './MessageBubble';
import SwiperComponent from './SwiperComponent';
import { chatsType, createModalContext } from '../screen/CallScreen';
import IconButton from '@mui/joy/IconButton';
import { useContext } from 'react';
import { useMediaQuery } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 440,
  bgcolor: 'background.paper',
  boxShadow: 10,
  borderRadius:4,
  p: 4,
};

const minStyle = {
  top:'0px',
  left:'0px',
  width:'100%',
  height:'100%',
  p:0,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  bgcolor: 'background.paper',
}

function BasicModal() {
  const {openModal,setOpenModal} = useContext(createModalContext)
  const handleClose = () => setOpenModal(false);
  const isSmall=useMediaQuery('(min-width:1000px)')


  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={isSmall ? style : minStyle}>
           <ChatBar handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}


const ChatBar = (props:any) => {
  const useModalContext=React.useContext(createModalContext)
  const {InputMessageRef,sendMessage,chats} =useModalContext
  const isSmall=useMediaQuery('(min-width:1000px)')
 
  return (
    <div id='chat-box' style={{
      height:'100%',
      paddingTop:!isSmall ? '20px' : '0px'
    }}>
          <Box sx={{display:'flex',justifyContent:'flex-end',
          padding : !isSmall ? 2 : 0,
          }}>
          <IconButton style={{width:'15px',height:'15px'}} variant="solid"
          onClick={props.handleClose}
          >
            
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"/></svg>
        </IconButton>
      </Box>
        <Box 
        style={{height:isSmall ? '400px' :'80%'}}
        sx={{
            display:'flex',
            flexDirection:'column'
        }}>
            <Box sx={{
                flex:10,
                padding : !isSmall ? 3 : 0
            }}>
                <SwiperComponent>
                  {chats.map((message:chatsType)=>(
                    <MessageBubble message={message.message} sender={message.id==='you'}/>
                  ))}  
                </SwiperComponent>     
            </Box>
            <Box sx={{
            display:'flex',
            padding : !isSmall ? 3 : 0,
            flex:1,
            paddingTop:isSmall ? '22px' : '0px',
            height:'50px',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            gap:2,
        }}>
            <Textarea style={{flex:8,

            }} 
            autoFocus
            onKeyDown={e=>{
              if(e.key==='Enter'){
                e.preventDefault()
                sendMessage(InputMessageRef.current.value)}
            }}
             slotProps={{ textarea: { ref: InputMessageRef } }}
            maxRows={3} name="Solid" placeholder="Type in here…" variant="solid" />
            <Button style={{backgroundColor:'#7a1bad',flex:1}} variant='contained' color='primary'
            onClick={()=>{
              sendMessage(InputMessageRef.current.value)
            }}
            
            >Send</Button>
        </Box>
        </Box>
       
    </div>
  )
}

export default BasicModal