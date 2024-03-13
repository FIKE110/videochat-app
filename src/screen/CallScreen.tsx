import React, { useEffect, useRef ,useState} from 'react'
import Peer, { MediaConnection } from 'peerjs'

const CallScreen = () => {
   const video = useRef<HTMLVideoElement>(null)
   const remoteVideo=useRef<HTMLVideoElement>(null)
   const peerRef=useRef<Peer>(null)
   const [peerId,setPeerId] = useState<string>(null)
   const [remoteId,setRemoteId]=useState<string>(null)
   const [userStream,setUserStream] = useState<MediaStream>(null)

   const call=(remoteId:string)=>{
    const call=peerRef.current?.call(remoteId,userStream)
    console.log("Making call:", call)
    call.on('stream',(remoteStream)=>{
        console.log('hello')
        remoteVideo.current.srcObject=remoteStream
    })
   }

   useEffect(()=>{
    const peer=new Peer()    
        peer.on('open',id=>{
            console.log('peer listening')
            console.log(id)
            setPeerId(id)
        })

        peer.on('call',call=>{
            console.log("user straeam is :",userStream )
            call.answer(video.current.srcObject)
            call.on('stream',remoteStream=>{
                remoteVideo.current.srcObject=remoteStream
                console.log(remoteStream)
            })
        })

        peerRef.current=peer
   },[]
   )

    const startVideo=async ()=>{
        if(userStream){
            userStream.getTracks().forEach(track=>track.stop())
            setUserStream(null)   
            return
        }
        const stream =await navigator.mediaDevices.getUserMedia({
            video:{
                facingMode:{exact:'user'}
            },
            audio:false})
        video.current.srcObject=stream
        console.log("stream saved",stream)
        setUserStream(stream)
    }

  return (
    <>
    <div>
        <p style={{textAlign:'center'}}>Chat Key: {peerId}<br />Share to the caller</p>
        </div>
    <div id="screencontainer">
        <div>
            <video ref={video} autoPlay></video>
            <div style={{
                display:'flex',
                justifyContent:'center',alignItems:'center',padding:'10px',gap:'10px'}}>
                <button
            onClick={()=>{
                startVideo()
            }}
            >{
                userStream ? "Stop video":"Start Video"
            }</button>
             <input type='text' onChange={(e)=>setRemoteId(e.target.value)}/>
            <button
            onClick={()=>{
                call(remoteId)
            }
            }
            >Click me</button>
            </div>
        </div>
        <div>
            <video ref={remoteVideo} autoPlay></video>
        </div>
    </div>
    </>
  )
}

export default CallScreen