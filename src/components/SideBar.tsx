import CallIcon from '../assets/icons8-phone-50.png'
import CallIcon2 from '../assets/icons8-phone-50 (1).png'
import EndCallIcon from '../assets/icons8-end-call-50.png'
import EndCallIcon2 from '../assets/icons8-end-call-50 (1).png'
import { useRef, useState } from 'react'


const SideBar = ({peerId,call}:
  {peerId:string,call:Function}) => {
  const [callIcon,setCallIcon] = useState<string>(CallIcon)
  const [endCallIcon,setEndCallIcon] =useState<string>(EndCallIcon)
  const inputRef=useRef<HTMLInputElement>(null)

  return (
    <div id="sidebar">
        <div style={{width:'100%'}}>
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
                  inputRef.current && call(inputRef.current.value)}}
                 >
                  <img src={callIcon} />
                </button>
                <p style={{textAlign:'center'}}>Call</p>
              </div>
               <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <button className='call-btn'
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
        <p id='share-with-caller'>Peer Id (Share this to caller)</p>
        <p style={{paddingTop:3,paddingBottom:10,fontWeight:'bold',color:'white',textAlign:'center'}}
        >{peerId}</p>
        </div>
    </div>
  )
}

export default SideBar