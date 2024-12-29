import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DashBoard from './pages/DashBoard'
import AdminStudent from './pages/AdminStudent'
import AddStudent from './pages/AddStudent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/adminStudent" element={<AdminStudent />} />
        <Route path="/addStudent/add" element={<AddStudent />} />
        <Route path="/addStudent/edit/:studentId" element={<AddStudent />} />
      </Routes>
    </>
  )
}

export default App
