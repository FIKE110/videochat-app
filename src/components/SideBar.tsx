import CallIcon from '../assets/icons8-phone-50.png'
import CallIcon2 from '../assets/icons8-phone-50 (1).png'
import EndCallIcon from '../assets/icons8-end-call-50.png'
import EndCallIcon2 from '../assets/icons8-end-call-50 (1).png'
import { useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import toast from 'react-hot-toast'


const SideBar = ({peerId,call,createNewPeer,disconnectPeer}:
  {peerId:string,call:Function,createNewPeer:Function,disconnectPeer:Function}) => {
  const [callIcon,setCallIcon] = useState<string>(CallIcon)
  const [endCallIcon,setEndCallIcon] =useState<string>(EndCallIcon)
  const inputRef=useRef<HTMLInputElement>(null)

  return (
    <div id="sidebar">
        <div style={{width:'100%',marginTop:40}}>
            <div id='input-container' style={{width:'100%',display:'flex',justifyContent:'center',
            alignItems:'center'
        }}>
                <input type='text' ref={inputRef}
                placeholder='Input Remote User Peer ID'/>
            </div>
            <div id="call-btn-container">
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                 <button className='call-btn'
                 onMouseOver={()=>setCallIcon(CallIcon2)}

                 onMouseOut={()=>setCallIcon(CallIcon)}

                 onClick={()=>{
                  if(inputRef.current && inputRef.current?.value.length<1){
                      toast.error('Please input a remote Peer ID',{style:{
                        fontWeight:'bold'
                      }})
                      return
                    }
                  inputRef.current && call(inputRef.current.value)}}
                 >
                  <img src={callIcon} />
                </button>
                <p style={{textAlign:'center'}}>Call</p>
              </div>
               <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <button className='call-btn' 
                onClick={()=>{
                 disconnectPeer()
                }
                }
                onMouseOver={()=>{
                  setEndCallIcon(EndCallIcon2)
                }}

                onMouseOut={()=>{
                  setEndCallIcon(EndCallIcon)
                }}
                >
                  <img src={endCallIcon} />
                </button>
                <p>HangUp</p>
               </div>
                
            </div>
        </div>
        <div id='peerid-container'>
        <p id='share-with-caller' style={{display:'flex',justifyContent:'center',gap:10}}>
          Peer Id (Share this to caller)
      </p>
        <p style={{paddingTop:3,paddingBottom:10,fontWeight:'bold',color:'white',textAlign:'center'}}
        >{peerId}</p>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          { peerId==='Error' && 
          <Button onClick={()=>createNewPeer()} style={{backgroundColor:'white',color:'#7a1bad',margin:'auto'}} variant="contained">
          Generate new PeerID
          
        </Button>}
        </Box>
       
        </div>
    </div>
  )
}

export default SideBar