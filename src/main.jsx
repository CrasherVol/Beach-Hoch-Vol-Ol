import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Anfahrt from './pages/Anfahrt.jsx'
import BlueBeach from './pages/BlueBeach.jsx'
import Dresscode from './pages/Dresscode.jsx'
import Ablauf from './pages/Ablauf.jsx'
import Anmeldung from './pages/Anmeldung.jsx'
import Hotels from './pages/Hotels.jsx'
import Admin from './pages/admin.jsx'   // 👈 hier importiert
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'anfahrt', element: <Anfahrt /> },
      { path: 'bluebeach', element: <BlueBeach /> },
      { path: 'dresscode', element: <Dresscode /> },
      { path: 'ablauf', element: <Ablauf /> },
      { path: 'anmeldung', element: <Anmeldung /> },
      { path: 'hotels', element: <Hotels /> },
      { path: 'admin', element: <Admin /> },   // 👈 neue Admin-Route
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)


