import optionsIcon from '../assets/icons8-chat-message-50 (1).png'

const OptionsIcon = ({handleFunction,defaultVal}:{handleFunction?:Function,defaultVal?:boolean}) => {
  return (
    <div className='options-icon' onClick={(e)=>{
      e.preventDefault()
      handleFunction ? handleFunction(defaultVal) : null
      }}>
        <img src={optionsIcon} />
        <p>Chat message</p>
    </div>
  )
}

export default OptionsIcon