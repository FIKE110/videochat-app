import React, { useRef } from 'react'

const CallScreen = () => {
   const video = useRef<HTMLVideoElement>(null)

    const startVideo=async ()=>{
        const stream =await navigator.mediaDevices.getUserMedia({video:true,audio:true})
        video.current.srcObject=stream
    }

  return (
    <div>
        <div>
            <video ref={video} autoPlay></video>
            <button
            onClick={()=>{
                startVideo()
            }}
            >Start video</button>
        </div>
        <div>
            <video></video>
        </div>
    </div>
  )
}

export default CallScreen