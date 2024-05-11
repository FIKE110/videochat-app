import { createContext, useEffect, useRef ,useState} from 'react'
import { Props } from 'react-input-emoji'
import Peer, { DataConnection, PeerOptions } from 'peerjs'
import SideBar from '../components/SideBar'
import Video from '../components/Video'
import BasicModal from '../components/ChatBar'
import Toast from '../components/Toast'
import Dial from '../components/Dial'
import AlertComponent from '../components/AlertComponent'

type chatsType={
  id:string,
  no:number,
  message:string
}

export const createModalContext=createContext(null)
export const createDialContext=createContext(null)

const CallScreen = () => {
   const video = useRef<HTMLVideoElement>(null)
   const InputMessageRef=useRef(null)
   const [openModal,setOpenModal]=useState(false)
   const [message,setMessage]=useState('')
   const [chats,setChats] = useState<chatsType[]>([])
   const [openSucessMessage,setOpenSuccessMessage] = useState(false)
   const remoteVideo=useRef<HTMLVideoElement>(null)
   const peerRef=useRef<Peer | null>(null)
   const [peerId,setPeerId] = useState<string>('')
   //const [remoteId,setRemoteId]=useState<string>('')
   const [userStreamStarted,setUserStreamStarted] =useState<boolean>(false)
   const [remoteStreamStarted,setRemoteStreamStarted]=useState<boolean>(false)
   const [remoteStream,setRemoteStream] = useState<MediaStream>()
   const [userStream,setUserStream] = useState<MediaStream>()
   const connectionRef=useRef<DataConnection | null>(null)

   const sendMessage=(text:string)=>{
    InputMessageRef.current.value=''
    if(connectionRef.current){  
      connectionRef.current.send(text)
      setOpenSuccessMessage(true)
    }
    
    console.log(chats)
    setChats([...chats,{no:chats.length,id:'you',message:text}])
   }
   
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
    const stream = await navigator.mediaDevices.getUserMedia(constraints)

        return stream

   }

   const call=async (remoteId:string)=>{
    const connection=peerRef.current?.connect(remoteId)
    if(connection) connectionRef.current=connection
    connection?.on('open',()=>{
        
    })

    connection?.on('data',data=>{
        console.log(data)
        setChats(prev=>[...prev,{no:chats.length,id:'other',message:data as string}])
    })


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

  const constraints = {
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: 'environment' // or 'user' for front-facing camera
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    }
  };

   useEffect(()=>{
    const peer=new Peer(peerOptions)    
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

        peer.on('disconnected',()=>{
          console.log('disconnected')
        })
        peer.on('error',(err:Error)=>{
            setPeerId(err.name)
        })

        peer.on('connection',conn=>{
            connectionRef.current=conn
            conn.on('data',data=>{
                console.log(data)
                setChats(prev=>[...prev,{no:chats.length,id:'others',message:data as string}])
              })
        })

       peerRef.current=peer
   },[]
   )


  return (
    <>
    <div id='main-container' style={{
        display:'flex',
        height:'520px',
    }
    }>
      
    <SideBar peerId={peerId}  call={call} />
    <div style={{display:'flex',flexDirection:'column'}}>
       <div id="screencontainer"> 
        <Video videoRef={video} 
        streamStarted={userStreamStarted}
        user leftBtnFun={toggleVideo} showVideo rightBtnFun={toggleAudio}/>
        <Video videoRef={remoteVideo} 
        streamStarted={remoteStreamStarted}
        leftBtnFun={toggleRemoteVideo} showVideo={false} 
        rightBtnFun={toggleRemoteAudio}/>
    </div>
    <div id='dial-container'>
      <createModalContext.Provider value={{sendMessage,InputMessageRef,chats,peerId,openModal,setOpenModal}}>
      <BasicModal />
    </createModalContext.Provider>
      <createDialContext.Provider value={{setOpenModal}}> 
      <div id='dial'>
        <Dial />
      </div>
        
      </createDialContext.Provider>
    <Toast open={openSucessMessage} setOpen={setOpenSuccessMessage}/>
    
    </div>
    </div>
   
    </div>
    </>
  )
}

export default CallScreen