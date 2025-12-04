import { NavLink, Outlet } from 'react-router-dom'
// import Sun from './components/Sun.jsx' // Alte Sonne deaktiviert
import CursorBall from './components/CursorBall.jsx'
import Palms from './components/Palms.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-sand relative cursor-none overflow-x-hidden">
      {/* Sonnen-Deko oben rechts – etwas kleiner + näher am Rand */}
      <div
  className="sun fixed top-[-60px] right-[-60px] w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full pointer-events-none z-0"

        style={{
          background:
            'radial-gradient(circle at center, #fde68a 20%, #fbbf24 45%, #f59e0b 70%, transparent 80%)',
          boxShadow:
            '0 0 80px 30px rgba(251,191,36,0.6), 0 0 200px 80px rgba(253,224,71,0.3)',
          filter: 'blur(4px) brightness(1.05)',
          animation: 'sunPulse 6s ease-in-out infinite',
        }}
      ></div>

      {/* Lichtschein im Hintergrund oben rechts */}
      <div
        className="fixed top-0 right-0 w-[60vw] h-[100vh] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(253,224,71,0.35) 0%, rgba(253,224,71,0.15) 30%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      ></div>

      <Palms />
      <CursorBall />

      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/60 border-b border-white/60">
        <div className="max-w-[1100px] mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
          {/* Logo / Titel */}
          <a href="/" className="flex items-center gap-3 font-extrabold shrink-0">
            <img
              src="/logo.png"
              alt="Volker & Olga – Logo"
              className="h-9 w-auto rounded-xl shadow-soft"
            />
            <span className="hidden sm:inline">Volker ❤ Olga</span>
          </a>

          {/* NAV – auf Handy horizontal scrollbar */}
          <nav className="flex-1 overflow-x-auto">
            <div className="flex items-center justify-end gap-2 whitespace-nowrap">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `shrink-0 px-3 py-2 rounded-xl text-sm ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-white/70'
                  }`
                }
              >
                Start
              </NavLink>
              <NavLink
                to="/anfahrt"
                className={({ isActive }) =>
                  `shrink-0 px-3 py-2 rounded-xl text-sm ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-white/70'
                  }`
                }
              >
                Anfahrt
              </NavLink>
              <NavLink
                to="/bluebeach"
                className={({ isActive }) =>
                  `shrink-0 px-3 py-2 rounded-xl text-sm ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-white/70'
                  }`
                }
              >
                BlueBeach
              </NavLink>
              <NavLink
                to="/dresscode"
                className={({ isActive }) =>
                  `shrink-0 px-3 py-2 rounded-xl text-sm ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-white/70'
                  }`
                }
              >
                Dresscode
              </NavLink>
              <NavLink
                to="/ablauf"
                className={({ isActive }) =>
                  `shrink-0 px-3 py-2 rounded-xl text-sm ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-white/70'
                  }`
                }
              >
                Ablauf
              </NavLink>
              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  `shrink-0 px-3 py-2 rounded-xl text-sm ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-white/70'
                  }`
                }
              >
                Hotels
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `shrink-0 px-3 py-2 rounded-xl text-sm ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-white/70'
                  }`
                }
              >
                FAQ
              </NavLink>

              <NavLink
                to="/anmeldung"
                className="shrink-0 px-3 py-2 rounded-xl text-sm text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:scale-[1.02] transition whitespace-nowrap"
              >
                Anmeldung
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-[1100px] mx-auto px-4">
        <Outlet />
      </main>

      <footer className="mt-10 bg-white/60 border-t border-white/60">
        <div className="max-w-[1100px] mx-auto px-4 py-6 text-sm">
          © 2026 Volker & Olga · BlueBeach Witten
        </div>
      </footer>
    </div>
  )
}
