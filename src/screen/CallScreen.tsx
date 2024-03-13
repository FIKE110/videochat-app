import React, { useRef ,useState} from 'react'

const CallScreen = () => {
   const video = useRef<HTMLVideoElement>(null)
   const [userStream,setUserStream] = useState<MediaStream>(null)

    const startVideo=async ()=>{
        if(!!userStream){
            userStream.getTracks().forEach(track=>track.stop())
            setUserStream(null)
            return
        }
        const stream =await navigator.mediaDevices.getUserMedia({
            video:{
                facingMode:{exact:'user'}
            },
            audio:true})
        video.current.srcObject=stream
        setUserStream(stream)
    }

  return (
    <div id="screencontainer">
        <div>
            <video ref={video} autoPlay></video>
            <button
            onClick={()=>{
                startVideo()
            }}
            >{
                userStream ? "Stop video":"Start Video"
            }</button>
        </div>
        <div>
            <video></video>
        </div>
    </div>
  )
}

export default CallScreen