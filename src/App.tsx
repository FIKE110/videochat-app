//import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CallScreen from './screen/CallScreen'

function App() {
  return (
    <Router>
      <Routes >
        <Route path='/call' element={<CallScreen />}/>
      </Routes>
    </Router>
  )
}

export default App
