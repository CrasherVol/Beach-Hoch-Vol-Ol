import Card from '../components/Card.jsx'
import SEO from '../components/SEO.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useState } from 'react'

function Logo({src, text}){
  if(src){
    return <img alt={text||'Logo'} src={src} className="h-9 object-contain"/>
  }
  return <div className="px-3 py-1 rounded-full bg-white shadow-soft border inline-block font-bold">{text}</div>
}

export default function Hotels(){
  const [open, setOpen] = useState(null)
  const items = [
    {
      name: 'Ardey Hotel ***',
      logoText: 'Ardey Hotel',
      addr: 'Ardeystraße 11–13, 58452 Witten',
      price: 'EZ 109 € · DZ 129 € (inkl. Frühstück)',
      distance: 'ca. 5–6 km | ~12 Min mit dem Auto',
      link: 'https://www.ardey-hotel.de/',
      map: 'https://www.google.com/maps/search/?api=1&query=Ardey+Hotel+Witten',
      note: 'Ruhige Lage nahe Innenstadt',
      imgs: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop'
      ]
    },
    {
      name: 'Ringhotel Parkhotel Witten ***',
      logoText: 'Parkhotel Witten',
      addr: 'Bergerstraße 23, 58452 Witten',
      price: 'EZ ab 72 € · DZ ab 92 €',
      distance: 'ca. 5 km | ~10 Min mit dem Auto',
      link: 'https://riepe.com/witten/',
      map: 'https://www.google.com/maps/search/?api=1&query=Ringhotel+Parkhotel+Witten',
      note: 'Zentral, nahe Bahnhof; Dachcafé mit Aussicht',
      imgs: [
        'https://riepe.com/wp-content/uploads/2015/08/zimmer-1024x768.jpg',
        'https://riepe.com/wp-content/uploads/2015/08/restaurant-1-1024x768.jpg',
        'https://riepe.com/wp-content/uploads/2015/08/panoramacafe-1024x768.jpg'
      ]
    },
    {
      name: 'Hotel Haus Hohenstein',
      logoText: 'Haus Hohenstein',
      addr: 'Rauendahler Str. 90, 58453 Witten',
      price: 'ab ~61–105 € (je nach Datum)',
      distance: 'ca. 6–7 km | ~12–15 Min mit dem Auto',
      link: 'https://www.hohenstein-witten.de/',
      map: 'https://www.google.com/maps/search/?api=1&query=Haus+Hohenstein+Witten',
      note: 'Am Hohenstein-Wald, viel Natur',
      imgs: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/8a/40/6a/haus-hohenstein.jpg?w=1200&h=-1&s=1',
        'https://images.unsplash.com/photo-1519710884009-0e5890894a85?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop'
      ]
    }
  ]
  return (
    <div className="page py-6">
      <SEO title="Hotelinfos" description="Empfehlungen, Preisrahmen, Fahrzeiten und Hotelausstattung nahe BlueBeach Witten."/>
      <h2 className="text-2xl font-bold mb-3">Hotelinfos (nahe BlueBeach)</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((h,i)=>(
          <Card key={i} title={<span><Logo src={h.logoUrl} text={h.logoText}/> – {h.name}</span>}>
            <div className="grid md:grid-cols-1 gap-3 my-2">
              {h.imgs.map((src,idx)=>(<img key={idx} alt={`${h.name} Bild ${idx+1}`} src={src} onClick={()=>setOpen(src)} className="w-full h-[180px] object-cover rounded-2xl shadow-soft cursor-pointer" />))}
            </div>
            <p><b>Adresse:</b> {h.addr}</p>
            <p><b>Preis:</b> {h.price}</p>
            <p><b>Entfernung/Fahrzeit:</b> {h.distance}</p>
            <div className="flex flex-wrap gap-2 my-2">
              <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-sm">🥐 Frühstück</span>
              <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-sm">📶 WLAN</span>
              <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-sm">🅿️ Parken</span>
              <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-sm">🍽️ Restaurant/Bar</span>
              <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-sm">🧖 Sauna/Wellness (teilw.)</span>
            </div>
            <p className="text-slate-600">{h.note}</p>
            <div className="mt-2 flex gap-2">
              <a className="px-3 py-2 rounded-xl bg-white shadow-soft" target="_blank" rel="noreferrer" href={h.link}>Website</a>
              <a className="px-3 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft" target="_blank" rel="noreferrer" href={h.map}>Auf Karte ansehen</a>
            </div>
          </Card>
        ))}
      </div>
      <Lightbox src={open} onClose={()=>setOpen(null)} />
    </div>
  )
}
