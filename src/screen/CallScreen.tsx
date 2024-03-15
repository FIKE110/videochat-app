import { useEffect, useRef ,useState} from 'react'
import Peer from 'peerjs'
import SideBar from '../components/SideBar'
import Video from '../components/Video'

const CallScreen = () => {
   const video = useRef<HTMLVideoElement>(null)
   const remoteVideo=useRef<HTMLVideoElement>(null)
   const peerRef=useRef<Peer>(null)
   const [peerId,setPeerId] = useState<string>('')
   const [remoteId,setRemoteId]=useState<string>('')
   const [remoteStream,setRemoteStream] = useState<MediaStream>()
   const [userStream,setUserStream] = useState<MediaStream>()
   const [showRemoteVideo,setShowRemoteVideo] = useState<boolean>(true)
   let showVideo=false
   let muteAudio=false
   let onRemoteSpeaker=true

   const toggleVideo=()=>{
        showVideo=!showVideo
        userStream.getVideoTracks()[0].enabled=showVideo
   }

   const toggleAudio=()=>{
    muteAudio=!muteAudio
    userStream.getAudioTracks()[0].enabled=!muteAudio
}


   const toggleRemoteVideo=()=>{
    setShowRemoteVideo(!showRemoteVideo)
   }

   const toggleRemoteAudio=()=>{
    onRemoteSpeaker=!onRemoteSpeaker
    remoteVideo.current.volume=0
   }

   const getStream= async ()=>{
    const stream = await navigator.mediaDevices.getUserMedia({
        video:{
            facingMode:{exact:'user'}
        },
        audio:true})

        return stream

   }

   const call=async (remoteId:string)=>{
    const stream=await getStream()
    stream.getVideoTracks()[0].enabled=showVideo
    video.current.srcObject=stream
    const call=peerRef.current?.call(remoteId,stream)
    console.log("Making call:", call)
    call && call.on('stream',(remoteStream:MediaStream)=>{
        if(!remoteVideo.current) return
        console.log("Callers Stream is ",remoteStream)
        remoteVideo.current.srcObject=remoteStream
        setRemoteStream(remoteStream)
    })
    setUserStream(stream)
   }

   function createRandomString(length:number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

   useEffect(()=>{
    const peer=new Peer('iyke_'+createRandomString(10)+'_code')    
    setPeerId('Generating Peer ID . . .')
        peer.on('open',id=>{
            console.log('peer listening')
            console.log(id)
            setPeerId(id)
        })

        peer.on('call',async call=>{
            console.log("user stream is :",userStream)
            if(!video.current) return
            const answer=confirm('Ringing !!! Click Ok to answer call')
            if(answer){
                const stream=await getStream()
                call.answer(await stream)
                setUserStream(await stream)
                video.current.srcObject=await stream
                stream.getVideoTracks()[0].enabled=showVideo
                call.on('stream',remoteStream=>{
                if(!remoteVideo.current) return
                remoteVideo.current.srcObject=remoteStream
                console.log("Answer Stream is ",remoteStream)
                setRemoteStream(remoteStream)
            })
            }
        })

       peerRef.current=peer
   },[]
   )

    const startVideo=async ()=>{
        if(userStream){
            userStream.getTracks().forEach((track:MediaStreamTrack)=>track.stop())
            setUserStream(null)   
            return
        }
        const stream =await navigator.mediaDevices.getUserMedia({
            video:{
                facingMode:{exact:'user'}
            },
            audio:true})
        video.current.srcObject=stream
        console.log("stream saved",stream)
        setUserStream(stream)
    }

  return (
    <>
    <div style={{
        display:'flex',
        height:'520px',
    }
    }>
    <SideBar peerId={peerId} setRemoteId={setRemoteId} call={call} remoteId={remoteId}/>
    <div id="screencontainer">
        <Video videoRef={video} user leftBtnFun={toggleVideo} showVideo={true} rightBtnFun={toggleAudio}/>
        <Video videoRef={remoteVideo} leftBtnFun={toggleRemoteVideo} showVideo={showRemoteVideo}
        rightBtnFun={toggleRemoteAudio}/>
    </div>
    </div>
    </>
  )
}

export default CallScreen