import { RefObject,createContext,useEffect, useRef ,useState} from 'react'
import Peer, { DataConnection, PeerOptions } from 'peerjs'
import SideBar from '../components/SideBar'
import Video from '../components/Video'
import BasicModal from '../components/ChatBar'
import Dial from '../components/Dial'
import Toast from '../components/Toast'
import toast, { ToastOptions, Toaster } from 'react-hot-toast';
import NotficationMusic from '../assets/happy-pop-3-185288.mp3'
import ExtraComponentModal from '../components/ExtrasComponent'
import {  Box, Button, Typography } from '@mui/material'
import Ringtone from '../assets/dejan_zvuk.mp3'
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useDeviceSmall } from '../hooks/media'
import SimpleBottomNavigation from '../components/BottomNav'

export type chatsType={
  id:string,
  no:number,
  message:string
}



const notify = (audioRef:RefObject<HTMLAudioElement>) => {
  if(audioRef){
    audioRef.current?.play()
   setTimeout(()=>audioRef.current?.pause(),10000)
  }
  
  return new Promise((resolve) => {
   toast((t:ToastOptions) => (
      <Box>
        <Typography>
          Ringing !!! Answer or Decline Call
        </Typography>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:2,paddingTop:2}}>
           <Button
           size='small'
           color='success'
           variant='contained'
           endIcon={<CallIcon />}
        sx={{color:'white',fontSize:'12px'}}
        onClick={() => handleAnswer(t)}>Answer</Button>
        <Button 
        size='small'
        color='error'
        variant='contained'
        endIcon={<CallEndIcon />}
        sx={{color:'white',fontSize:'12px'}}
         onClick={() => handleDecline(t)}>Decline</Button>
        </Box>
       
      </Box>
    ),{
      style:{
        fontWeight:'bold',
        backgroundColor:''
      },
      duration:10000,
      position:'top-center',

    });

    const handleAnswer = (t:ToastOptions) => {
      toast.dismiss(t.id)
      audioRef.current?.pause()
      resolve('answered');
      
    };

    const handleDecline = (t:ToastOptions) => {
      toast.dismiss(t.id)
      audioRef.current?.pause()
      resolve('declined');
      
    };
  });
};

export const createModalContext=createContext<any>(null)
export const createDialContext=createContext<any>(null)

export const copyToClipBoard=(text:string,message:string)=>{
  navigator.clipboard.writeText(text)
  .then(()=>{
    toast.success(message,{
      style:{
        fontWeight:'bold'
      }
    })
  })
  .catch(()=>toast.error('Could not copy to clipboard'))

}

const CallScreen = () => {
   const video = useRef<HTMLVideoElement>(null)
   const ringtoneRef=useRef<HTMLAudioElement>(null)
   const notificationAudioRef=useRef<HTMLAudioElement>(null)
   const InputMessageRef=useRef<HTMLInputElement>(null)
   const [openModal,setOpenModal]=useState(false)
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
   const [openExtraModal,setOpenExtraModal] = useState(false)
   const [onCall,setOnCall]=useState(false)

   function createNewPeer(onload?:true){
    const onPeerCreated = new Event('onpeercreated');
    const onPeerCreatedError = new Event('onpeercreatederror');
      const searchParams = new URLSearchParams(location.search);
      const query = onload ? searchParams.get('peerid') : null;
      const peer=new Peer(peerOptions)
      function callEvent(state:string) {
        // Trigger the event
        if(state=='peercreated'){
          document.dispatchEvent(onPeerCreated);}
        if(state=='peernotcreated'){
          document.dispatchEvent(onPeerCreatedError)
        }
    }
      const peerOpened = new Promise((resolve, reject) => {
        console.log('inside the promise')
        document.addEventListener('onpeercreatederror', function() {
        reject('foo')
    });  
        document.addEventListener('onpeercreated', function() {
          console.log('hello')
          resolve('foo')
      });
 
      });

      toast.promise(
        peerOpened,
         {
           loading: <b>Wait a moment assigning you a peer id ...</b>,
           success: <b>Peer id successfully assigned</b>,
           error: <b>Error !!! Could not create Peer Could be a Network/Firewall issue 🤔 </b>,
         }
       );
    setPeerId('Generating Peer ID . . .')
        peer.on('open',id=>{
            callEvent('peercreated')
            console.log('peer listening')
            console.log(id)
            setPeerId(id)
            if(query){
              call(query)
            }
        })

        peer.on('call',async call=>{
            console.log("user stream is :",userStream)
            if(!video.current) return
            const answer=await notify(ringtoneRef)
            console.log(answer)
            if(answer == 'answered'){
                const stream=await getStream()
                call.answer(await stream)
                setUserStream(await stream)
                setOnCall(true)
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
          callEvent('peernotcreated')
          setPeerId('Error')
        })

        peer.on('error',(err)=>{
            callEvent('peernotcreated')
            toast.error('Error occurred of type '+err.type,{
              style:{
                fontWeight:'bold'
              }
            })
            if(err.type=='peer-unavailable'){
              toast.error('Peer not Available Get a New Remote Peer ID ',{
                style:{
                  fontWeight:'bold'
                }
              })
            }
            setPeerId('Error')
        })

        peer.on('connection',conn=>{
            connectionRef.current=conn
            conn.on('data',data=>{
                console.log(data)
                receiveMessage(data as string)
                setChats(prev=>[...prev,{no:chats.length,id:'others',message:data as string}])
                playNotification()
              })
        })

       peerRef.current=peer
   }

   const disconnectPeer=()=>{
    if(peerRef.current){

      toast.error('Peer  disconnected from PeerServer ',{
        style:{
          fontWeight:'bold'
        }
      })
    }
   }

   const playNotification=()=>{
    if(notificationAudioRef.current){
      notificationAudioRef.current.play()
    }
   }

   const sendMessage=(text:string)=>{
    if(InputMessageRef.current){
      if(InputMessageRef.current.value.length<1){
        toast.error("You cannot send an empty message",{
          style:{fontWeight:'bold'}
        })
        return
      }
    InputMessageRef.current.value=''
   // playNotification()
    }

    if(connectionRef.current){  
      connectionRef.current.send(text)
      setOpenSuccessMessage(true)
    }
    else{
      toast.error("You are currently not connected to any peer",{
        style:{fontWeight:'bold'}
      }
      )
    }
    
    console.log(chats)
    setChats([...chats,{no:chats.length,id:'you',message:text}])
   }
   
   const receiveMessage=(message:string)=>{
    toast(message,
  {
    icon: '🧑',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
      fontWeight:'bold',
      overflow:'hidden'
    },
    position:'bottom-right',
    duration:4000
  }
);
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
    setOnCall(true)
    if(peerId === 'Generating Peer ID . . .' || peerId === 'Error'){
      toast.error('No peerId has been assigned to make a call',{
        style:{
          fontWeight:'bold'
        }
      })
      return
    }
    const connection=peerRef.current?.connect(remoteId)
    if(connection) connectionRef.current=connection
    connection?.on('open',()=>{
        
    })

    connection?.on('data',data=>{
        console.log(data)
        playNotification()
        receiveMessage(data as string)
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
        setOnCall(true)
        remoteVideo.current.srcObject=remoteStream
        setRemoteStreamStarted(true)
        setRemoteStream(remoteStream)
    })
    setUserStream(stream)
    setUserStreamStarted(true)

    return stream
   }

/*   function createRandomString(length:number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  */
  const constraints = {
    video: {
      
    //  width: { ideal: 1280 },
     // height: { ideal: 720 },
    //  facingMode: 'environment' // or 'user' for front-facing camera
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    }
  };

   useEffect(()=>{
    createNewPeer(true)
    //toggleRemoteVideo()
   },[])


  return (
    <>

    {
      useDeviceSmall()?
      <div style={{position:'relative'}}>
        <Toaster position='top-right' />
     <SideBar peerId={peerId}  call={call} 
       createNewPeer={createNewPeer} disconnectPeer={disconnectPeer}/>
       <div id="mobile-video-holder" style={{zIndex: onCall ? 3: -1}}>
        <video ref={video} id='user' autoPlay></video>
        <video ref={remoteVideo} id='remote' autoPlay></video>
       </div>
       <SimpleBottomNavigation index={onCall? 4 : -1} toggleVideo={toggleVideo} toggleAudio={toggleAudio}/>
      </div>
      :
    <Box id='main-container' style={{
        display:'flex',
        height:'100vh',
        overflow:'hidden',
    }
    }>
     <Toaster position='top-right' />
     <SideBar peerId={peerId}  call={call} createNewPeer={createNewPeer} disconnectPeer={disconnectPeer}/>
     <div id="dialvideo-holder" style={{display:'flex',flexDirection:'column'}}>
       <div id="screencontainer"> 
        <Video id='user' videoRef={video} 
        streamStarted={userStreamStarted}
        user leftBtnFun={toggleVideo} showVideo rightBtnFun={toggleAudio}/>
        <Video id='remote' videoRef={remoteVideo} 
        streamStarted={remoteStreamStarted}
        leftBtnFun={toggleRemoteVideo} showVideo={false} 
        rightBtnFun={toggleRemoteAudio}/>
    </div>
    <div id='dial-container'>
      <createModalContext.Provider 
      value={{sendMessage,InputMessageRef,chats,peerId,openModal,setOpenModal,openExtraModal,setOpenExtraModal}}>
      <BasicModal />
      <ExtraComponentModal />
    </createModalContext.Provider>
    <Toast open={openSucessMessage} setOpen={setOpenSuccessMessage}/>
    
      <createDialContext.Provider value={{setOpenModal,peerId,setOpenExtraModal}}> 
      <div id='dial'>
        <Dial />
      </div>
        
      </createDialContext.Provider>
    </div>
    </div>
    <audio ref={notificationAudioRef} src={NotficationMusic} />
    <audio ref={ringtoneRef}>
          <source src={Ringtone} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
    </Box>}
    </>
  )
}


export default CallScreen