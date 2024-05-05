import { useEffect, useRef ,useState} from 'react'
import Peer, { PeerOptions } from 'peerjs'
import SideBar from '../components/SideBar'
import Video from '../components/Video'
import OptionsButton from '../components/OptionsButton'
import OptionsMenuBar from '../components/OptionsMenuBar'

const CallScreen = () => {
   const video = useRef<HTMLVideoElement>(null)
   const remoteVideo=useRef<HTMLVideoElement>(null)
   const peerRef=useRef<Peer | null>(null)
   const [peerId,setPeerId] = useState<string>('')
   //const [remoteId,setRemoteId]=useState<string>('')
   const [userStreamStarted,setUserStreamStarted] =useState<boolean>(false)
   const [remoteStreamStarted,setRemoteStreamStarted]=useState<boolean>(false)
   const [remoteStream,setRemoteStream] = useState<MediaStream>()
   const [userStream,setUserStream] = useState<MediaStream>()
   const peerOptions:PeerOptions= {
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' },
    {url :'stun:stun1.l.google.com:19302'},
    {url : 'stun:stun2.l.google.com:19302'},
      ]}}
   let showVideo=false
   let muteAudio=false
   let showRemoteVideo=true
   let muteRemoteAudio=false

   const toggleVideo=()=>{
        showVideo=!showVideo
        userStream && (userStream.getVideoTracks()[0].enabled=showVideo)
   }

   const toggleAudio=()=>{
    muteAudio=!muteAudio
    userStream && (userStream.getAudioTracks()[0].enabled=!muteAudio)
}


   const toggleRemoteVideo=()=>{
    showRemoteVideo=!showRemoteVideo
    remoteStream && (remoteStream.getVideoTracks()[0].enabled=showRemoteVideo)
   }

   const toggleRemoteAudio=()=>{
    muteRemoteAudio=!muteRemoteAudio
    remoteStream && (remoteStream.getAudioTracks()[0].enabled=muteRemoteAudio)
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
    if(!video.current) return
    const stream=await getStream()
    stream.getVideoTracks()[0].enabled=showVideo
    video.current.srcObject=stream
    const call=peerRef.current?.call(remoteId,stream)
    console.log("Making call:", call)
    call && call.on('stream',(remoteStream:MediaStream)=>{
        if(!remoteVideo.current) return
        console.log("Callers Stream is ",remoteStream)
        remoteVideo.current.srcObject=remoteStream
        setRemoteStreamStarted(true)
        setRemoteStream(remoteStream)
    })
    setUserStream(stream)
    setUserStreamStarted(true)
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
    const peer=new Peer('iyke_'+createRandomString(10)+'_code',peerOptions)    
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
                setUserStreamStarted(true)
                stream.getVideoTracks()[0].enabled=showVideo
                call.on('stream',remoteStream=>{
                if(!remoteVideo.current) return
                remoteVideo.current.srcObject=remoteStream
                console.log("Answer Stream is ",remoteStream)
                setRemoteStream(remoteStream)
                setRemoteStreamStarted(true)
            })
            }
        })

        peer.on('error',(err:Error)=>{
            setPeerId(err.name)
        })
       peerRef.current=peer
   },[]
   )


  return (
    <>
    <div style={{
        display:'flex',
        height:'520px',
    }
    }>
    <SideBar peerId={peerId}  call={call} />
    <div style={{display:'flex',flexDirection:'column'}}>
        <div id="extrascontainer" style={{width:'100%',display:'flex',justifyContent:'flex-end',padding:20}}>
        <OptionsButton />
        <OptionsMenuBar />
       </div>
       <div id="screencontainer"> 
        <Video videoRef={video} 
        streamStarted={userStreamStarted}
        user leftBtnFun={toggleVideo} showVideo rightBtnFun={toggleAudio}/>
        <Video videoRef={remoteVideo} 
        streamStarted={remoteStreamStarted}
        leftBtnFun={toggleRemoteVideo} showVideo={false} 
        rightBtnFun={toggleRemoteAudio}/>
    </div>
    </div>
   
    </div>
    </>
  )
}

export default CallScreen