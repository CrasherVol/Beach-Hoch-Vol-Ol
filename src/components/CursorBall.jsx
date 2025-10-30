import { useEffect, useState } from 'react'

export default function CursorBall(){
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      aria-hidden
      className="cursor-ball"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      🏐
    </div>
  )
}
