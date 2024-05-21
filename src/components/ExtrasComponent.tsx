import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { copyToClipBoard, createModalContext } from '../screen/CallScreen';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  display:'flex',
  gap:3,
  flexDirection:'column',
  boxShadow: 24,
  borderRadius:4,
  p: 4,
};


export default function ExtraComponentModal() {
  const {openExtraModal,setOpenExtraModal} = React.useContext(createModalContext)
   const handleClose = () => setOpenExtraModal(false);
  
   return (
    <div>
      <Modal
        open={openExtraModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
            
        <Box sx={style}>
        <Box sx={{display:'flex',justifyContent:'flex-end'}}>
          <IconButton style={{width:'15px',height:'15px'}} variant="solid"
          onClick={handleClose} 
          >
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"/></svg>
        </IconButton>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:2}}>
                 <Typography sx={{fontWeight:'bold',fontSize:'16px'}} id="modal-modal-description" variant="h6" component="h6">
                    Peer ID :
                </Typography>
                <Textarea sx={{flex:4}} value="fjhfjhfjhf"/>
                <div className='copy' onClick={()=>copyToClipBoard("https://localhost:1000","Call Code successfully copied")}>
                  <ContentCopyRoundedIcon />
                  </div>
                
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:2}}>
                 <Typography sx={{fontWeight:'bold',fontSize:'16px'}} id="modal-modal-description" variant="h6" component="h6">
                  Call URL:
                </Typography>
                <Textarea sx={{flex:4}} value="https://localhost:1000"/>
                <div className='copy'
                onClick={()=>copyToClipBoard("https://localhost:1000","Call Link successfully copied to clipboard")}>
                  <ContentCopyRoundedIcon />
                </div>
            </Box>
        </Box>
        </>
      </Modal>
    </div>
  );
}