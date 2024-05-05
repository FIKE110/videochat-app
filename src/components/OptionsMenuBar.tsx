import OptionsIcon from "./OptionsIcon"
import '../styles/options.css'

const OptionsMenuBar = () => {
  return (
    <div id='options-menubar-container'>
        <div id='options-menubar'>
            <OptionsIcon />
            <OptionsIcon />
            <OptionsIcon />
            <OptionsIcon />
        </div>
    </div>
  )
}

export default OptionsMenuBar