import React from 'react'
import videoIcon from '../assets/icons8-camera-off-64.png'
import muteMicIcon from '../assets/icons8-mute-50.png'
import unMuteIcon from '../assets/icons8-mute-unmute-50.png'
import soundIcon from '../assets/icons8-sound-50.png'

const Video = ({videoRef,user,showVideo,leftBtnFun,rightBtnFun}:
  {videoRef:any,user?:boolean,
    showVideo?:boolean,
    leftBtnFun:Function,rightBtnFun:Function}) => {
  return (
    <div style={{width:'100%',border:"thin transparent solid",
      maxWidth:'120%',
        display:'flex',justifyContent:'center',alignItems:'center'
    }}>
         <div className='video-container'>
          <div style={{
            zIndex:20,
            backgroundColor:showVideo ? 'transparent': 'black',borderRadius:'20px'}}>
             <video ref={videoRef} autoPlay></video>
          </div>
           
            <div className='mute-container'>
                <button className='call-btn'
                onClick={()=>leftBtnFun()}
            ><img src={videoIcon}/></button>
            <button
            className='call-btn'
            onClick={()=>rightBtnFun()}
            ><img src={user ? unMuteIcon : muteMicIcon}/></button>
            </div>
        </div>
    </div>
  )
}

export default Video