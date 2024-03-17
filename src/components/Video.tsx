import { useState } from 'react'
import videoIcon from '../assets/icons8-camera-off-64.png'
import muteMicIcon from '../assets/icons8-mute-50.png'
import unMuteIcon from '../assets/icons8-mute-unmute-50.png'

const Video = ({videoRef,streamStarted,user,leftBtnFun,showVideo,rightBtnFun}:
  {videoRef:React.RefObject<HTMLVideoElement>,user?:boolean,
    showVideo:boolean,
    streamStarted?:boolean,
    leftBtnFun:Function,rightBtnFun:Function}) => {

    const [videoBtnOpacity,setVideoBtnOpacity]=useState(showVideo ? 0.2 : 1)
    const [soundBtnOpacity,setSoundBtnOpacity]=useState(0.2)


  return (
    <div style={{width:'100%',border:"thin transparent solid",
      maxWidth:'120%',
        display:'flex',justifyContent:'center',alignItems:'center'
    }}>
         <div className='video-container'>
          <div style={{borderRadius:'20px'}}>
             <video ref={videoRef} autoPlay></video>
          </div>
           
            <div className='mute-container'>
                <button className='call-btn'
                style={{backgroundColor:'#f1f1f1',border:'none'}}
                onClick={()=>{
                  setVideoBtnOpacity(videoBtnOpacity==1 ? 0.2 : 1)
                  leftBtnFun()}
              }
            disabled={!streamStarted}
            ><img src={videoIcon}
            style={{opacity:videoBtnOpacity}}
            /></button>
            <button
             style={{backgroundColor:'#f1f1f1',border:'none'}}
            className='call-btn'
            disabled={!streamStarted}
            onClick={()=>{
              setSoundBtnOpacity(soundBtnOpacity==1 ? 0.2 : 1)
              rightBtnFun()}}
            ><img src={user ? unMuteIcon : muteMicIcon} style={{opacity:soundBtnOpacity}}/></button>
            </div>
        </div>
    </div>
  )
}

export default Video