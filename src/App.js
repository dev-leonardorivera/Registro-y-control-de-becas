import Home from './page/Home'
import Dashboard from './page/Dashboard'

import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import './App.css'



function App() {
  return (
    <>
      
       
        <BrowserRouter>
          
          
          <Routes>
            <Route path='/' element={<Home  />}/>
            <Route path='/Dashboard/:seccion' element={<Dashboard/>}/>
            <Route path='/Dashboard' element={<Navigate to="/Dashboard/Inicio"></Navigate>}/>
            <Route path='/Home' element={<Navigate to="/"></Navigate>}/>
            <Route path='*' element={<Navigate to="/"></Navigate>}/>
  
          </Routes>
        </BrowserRouter>
        
      


    
    
    </>
  )
}

export default App