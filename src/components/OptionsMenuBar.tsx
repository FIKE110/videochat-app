import OptionsIcon from "./OptionsIcon"
import '../styles/options.css'
import { useEffect, useRef, useState } from "react"

const OptionsMenuBar = ({display,setBtnDisabled,displayMenu,showChatBox}:
    {display:boolean,setBtnDisabled:Function,displayMenu:string,showChatBox:Function}) => {
    const animationDuration='300ms'
    const animationType='forwards'
    const [showOptions,setShowOptions]=useState(true)
    const optionscontainerRef=useRef<HTMLDivElement | null>(null)
    const animate=()=>{
        if(optionscontainerRef.current)
        if(!display){
            optionscontainerRef.current.style.animation=`slideBack ${animationDuration} ${animationType}`
        }
        else{
            optionscontainerRef.current.style.animation=`slideFront ${animationDuration} ${animationType}`
        }
    } 

    useEffect(()=>{

        if(optionscontainerRef.current){

        optionscontainerRef.current.addEventListener('animationstart',()=>{
            setShowOptions(!showOptions)
            setBtnDisabled(true)
        })
        optionscontainerRef.current.addEventListener('animationend',()=>{
            setBtnDisabled(false)
        })
        animate()
      }
        return()=>{
            optionscontainerRef.current?.removeEventListener('animationstart',()=>{})
            optionscontainerRef.current?.removeEventListener('animationend',()=>{})
        }
    },[display])

  return (
    <div id='options-menubar-container' style={{display:displayMenu}} ref={optionscontainerRef}>
        <div id='options-menubar' style={{opacity:Number(!showOptions)}}>
            <OptionsIcon handleFunction={showChatBox} defaultVal={false}/>
            <OptionsIcon />
            <OptionsIcon />
            <OptionsIcon />
        </div>
    </div>
  )
}


export default OptionsMenuBar