import React from 'react'
import  optionsIcon from '../assets/icons8-three-dots-50.png'

const OptionsButton = () => {
  return (
    <div>
        <button style={{
            border:'none',
            padding:3,
            borderRadius:7,
            backgroundColor:'white',
            boxShadow:'0px 0px 2px rgb(0,0,0)'
        }}><img src={optionsIcon} style={{height:30}}/></button>
    </div>
  )
}

export default OptionsButton