import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import UserProvider from './Components/DataProvider'

function App() {
  const [displayLogoutBtn, setDisplayLogoutBtn] = useState(false);
  // const [todos, setTodos] = useState([]);
  return (
    <>
      <UserProvider>
        <div className="App">
          <Navbar displayLogoutBtn={displayLogoutBtn} setDisplayLogoutBtn={setDisplayLogoutBtn} />
        </div>
        <Routes>
          <Route index element={<Home />} displayLogoutBtn={displayLogoutBtn} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
