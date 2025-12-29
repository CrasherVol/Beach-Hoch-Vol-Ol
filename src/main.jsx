import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react' // ✅ NEU

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Anfahrt from './pages/Anfahrt.jsx'
import BlueBeach from './pages/BlueBeach.jsx'
import Dresscode from './pages/Dresscode.jsx'
import Ablauf from './pages/Ablauf.jsx'
import Anmeldung from './pages/Anmeldung.jsx'
import Hotels from './pages/Hotels.jsx'
import Admin from './pages/admin.jsx'
import Faq from './pages/Faq.jsx'
import Sandhochzeit from './pages/Sandhochzeit.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      // 🔥 WhatsApp Preview Alias
      { path: 'Einladung', element: <Navigate to="/" replace /> },

      { path: 'anfahrt', element: <Anfahrt /> },
      { path: 'bluebeach', element: <BlueBeach /> },
      { path: 'dresscode', element: <Dresscode /> },
      { path: 'ablauf', element: <Ablauf /> },
      { path: 'anmeldung', element: <Anmeldung /> },
      { path: 'hotels', element: <Hotels /> },
      { path: 'faq', element: <Faq /> },
      { path: 'admin', element: <Admin /> },
      { path: 'sandhochzeit', element: <Sandhochzeit /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
      <Analytics /> {/* ✅ DAS aktiviert Vercel Analytics */}
    </HelmetProvider>
  </React.StrictMode>
)
