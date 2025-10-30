import { useState, useEffect } from 'react'
import Card from '../components/Card.jsx'
import SEO from '../components/SEO.jsx'

export default function Anmeldung(){
  const [sent, setSent] = useState(false)
  const [f, setF] = useState({name:'', email:'', persons:1, message:'', allergies:''})
  const onChange = e => setF(v=>({...v,[e.target.name]: e.target.type==='number'? Number(e.target.value): e.target.value}))
  useEffect(()=>{ window.scrollTo(0,0) }, [sent])
  const onSubmit = e => {
    e.preventDefault()
    const list = JSON.parse(localStorage.getItem('rsvp-list')||'[]')
    list.push({...f, ts:new Date().toISOString()})
    localStorage.setItem('rsvp-list', JSON.stringify(list))
    setSent(true)
  }
  if(sent){
    return (
      <div className="page py-6">
        <SEO title="Danke – Anmeldung" />
        <Card title="Danke für deine Zusage!">
          <p>Wir haben dich mit <b>{f.persons}</b> Person(en) vermerkt. Eine Bestätigung folgt (Demo).</p>
          <a href="/" className="mt-2 inline-block px-4 py-2 rounded-xl bg-white shadow-soft">Zur Startseite</a>
        </Card>
      </div>
    )
  }
  return (
    <div className="page py-6">
      <SEO title="Anmeldung" description="Sag uns kurz Bescheid, mit wie vielen Personen du kommst."/>
      <h2 className="text-2xl font-bold mb-3">Anmeldung</h2>
      <Card>
        <form onSubmit={onSubmit} className="grid gap-3 max-w-[560px]">
          <label className="grid gap-1">Name<input required name="name" value={f.name} onChange={onChange} placeholder="Vor- und Nachname" className="border rounded-xl px-3 py-2 bg-white/90"/></label>
          <label className="grid gap-1">E‑Mail<input required type="email" name="email" value={f.email} onChange={onChange} placeholder="du@example.com" className="border rounded-xl px-3 py-2 bg-white/90"/></label>
          <label className="grid gap-1">Personen<input required type="number" name="persons" min={1} max={12} value={f.persons} onChange={onChange} className="border rounded-xl px-3 py-2 bg-white/90"/></label>
          <label className="grid gap-1">Trinker oder Fahrer? (optional)<input name="allergies" value={f.allergies} onChange={onChange} placeholder="hoffentlich kein Fahrer, denn wir haben viele leckere Cocktails" className="border rounded-xl px-3 py-2 bg-white/90"/></label>
          <label className="grid gap-1">noch was???<textarea name="message" rows="4" value={f.message} onChange={onChange} placeholder="Gibts noch was wichtiges was du uns sagen willst???" className="border rounded-xl px-3 py-2 bg-white/90"/></label>
          <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:scale-[1.02] transition">Zusage senden</button>
          <p className="text-slate-500 text-sm">Datenschutz: Angaben nur zur Organisation der Feier (Demo).</p>
        </form>
      </Card>
    </div>
  )
}
