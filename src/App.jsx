import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from './pages/Details'
import Favoret from './pages/Favoret'

function App() {

  return (
    <>
    
      <BrowserRouter basename='/Movies_App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="//favoret" element={<Favoret />} />
          <Route path="/details/:id" element={<Details />} />

        </Routes>
      
      
      </BrowserRouter>


  
  
     
    </>
  )
}

export default App
