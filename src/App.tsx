import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CallScreen from './screen/CallScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CallScreen />
    </>
  )
}

export default App
