import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import ChatBubbleIcon from '@mui/icons-material/Chat'
import { useContext } from 'react';
import { createDialContext } from '../screen/CallScreen';
import { copyToClipBoard } from '../screen/CallScreen';
import toast from 'react-hot-toast';
import { PeerErrorType } from 'peerjs';

const shareLink=async (peerId:string)=>{
  console.log(window.location)
  try {
    await navigator.share({
      title: "Test",
      text: "This is a test share",
      url: `${window.location.origin}/call?peerid=${peerId}`,
    });
  } catch (err:any) {
    toast.error('Could not use Share API error '+err.message,{
      style:{
        fontWeight:'bold'
      }
    })
    console.error("error:", err.message);
  }
}

export default function Dial() {
    const {setOpenModal,setOpenExtraModal,peerId} = useContext(createDialContext)
    
  const actions = [
  { icon: <ViewDayIcon />, name: 'Extras' ,handler:() => setOpenExtraModal(true)},
  { icon: <ShareIcon />, name: 'Share' ,handler:()=>{
    if(peerId === 'Generating Peer ID . . .' || peerId === 'Error') shareLink(peerId)}},
  { icon: <FileCopyIcon />, name: 'Copy link',handler:()=>{
    if(peerId === 'Generating Peer ID . . .' || peerId==='Error'){
      toast.error('Could not copy to clipboard',{
        style:{
          fontWeight:'bold'
        }
      })
    }
    else{
       copyToClipBoard( `${window.location.origin}/call?peerid=${peerId}`,
 `Call Link Successfully copied to clipboard ${peerId in PeerErrorType}`
  )
    }
    }},
   { icon: <ChatBubbleIcon />, name: 'Chat',handler:()=>setOpenModal(true) },
];

  return (
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom:210, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            onClick={action.handler}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
  );
}