import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  const [displayLogoutBtn, setDisplayLogoutBtn] = useState(false);
  return (
    <>
      <div className="App">
        <Navbar displayLogoutBtn={displayLogoutBtn} setDisplayLogoutBtn={setDisplayLogoutBtn} />
      </div>
      <Routes>
        <Route index element={<Home />} displayLogoutBtn={displayLogoutBtn} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
