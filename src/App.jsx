import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Accordian from './Components/Accordian'
// import Add_Todo from './Components/AddButton'
import Home from './Components/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Navbar />
        {/* <Home /> */}
        {/* <Add_Todo /> */}
        {/* <Accordian /> */}
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
