// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/Home.jsx'
import Anmeldung from './pages/Anmeldung.jsx'
import Anfahrt from './pages/Anfahrt.jsx'
import Ablauf from './pages/Ablauf.jsx'
import Dresscode from './pages/Dresscode.jsx'
import BlueBeach from './pages/BlueBeach.jsx'
import Hotels from './pages/Hotels.jsx'
import Admin from './pages/admin.jsx' // 👈 wichtig: klein geschrieben!

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anmeldung" element={<Anmeldung />} />
        <Route path="/anfahrt" element={<Anfahrt />} />
        <Route path="/ablauf" element={<Ablauf />} />
        <Route path="/dresscode" element={<Dresscode />} />
        <Route path="/bluebeach" element={<BlueBeach />} />
        <Route path="/hotels" element={<Hotels />} />
        {/* Neue Admin-Route */}
        <Route path="/admin" element={<Admin />} />
        {/* Fallback: unbekannte Route → Startseite */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
