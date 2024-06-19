import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter ,Route, Routes, useLocation } from 'react-router-dom'
import Single from './Components/Single-Track/Single'
import NewData from './Components/Data/Data'
import { useState } from 'react'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={NewData}/>;
        <Route path="/Single/:id" Component={Single}/>
        </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
