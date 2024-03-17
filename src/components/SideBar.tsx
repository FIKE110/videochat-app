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
        <div>
            <div style={{width:'100%',display:'flex',justifyContent:'center',
            alignItems:'center',marginBottom:70
        }}>
                <input type='text' ref={inputRef}
                placeholder='Input Remote User Peer ID'/>
            </div>
            <div id="call-btn-container">
              <div>
                 <button className='call-btn'
                 onMouseOver={()=>setCallIcon(CallIcon2)}

                 onMouseOut={()=>setCallIcon(CallIcon)}

                 onClick={()=>{
                  inputRef.current && call(inputRef.current.value)}}
                 >
                  <img src={callIcon} />
                </button>
                <p>Call</p>
              </div>
               <div>
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
        <div style={{marginTop:100}}>
        <p style={{textAlign:'center'}}>Peer Id</p>
        <p style={{paddingTop:10,paddingBottom:5,fontWeight:'bold'}}
        >{peerId}</p>
        <p>Share this to the caller</p>
        </div>
    </div>
  )
}

export default SideBar