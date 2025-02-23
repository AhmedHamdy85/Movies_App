import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from './pages/Details'
import Favoret from './pages/Favoret'
import NavBar from './componant/NavBar'

function App() {

  return (
    <>
    
      <BrowserRouter basename='/Movies_App'>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/favoret" element={<Favoret />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<h1>NotFound</h1>} />

        </Routes>
      
      
      </BrowserRouter>


  
  
     
    </>
  )
}

export default App
