import optionsIcon from '../assets/icons8-chat-message-50 (1).png'

<<<<<<< HEAD
const OptionsIcon = ({handleFunction,defaultVal}:{handleFunction?:Function,defaultVal?:boolean}) => {
  return (
    <div className='options-icon' onClick={(e)=>{
      e.preventDefault()
      handleFunction ? handleFunction(defaultVal) : null
      }}>
=======
const OptionsIcon = () => {
  return (
    <div className='options-icon'>
>>>>>>> refs/remotes/origin/main
        <img src={optionsIcon} />
        <p>Chat message</p>
    </div>
  )
}

export default OptionsIcon