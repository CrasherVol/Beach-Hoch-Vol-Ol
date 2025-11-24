import Card from '../components/Card.jsx'
import SEO from '../components/SEO.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useState } from 'react'

function Logo({ src, text }) {
  if (src) {
    return <img alt={text || 'Logo'} src={src} className="h-9 object-contain" />
  }
  return (
    <div className="px-3 py-1 rounded-full bg-white shadow-soft border inline-block font-bold">
      {text}
    </div>
  )
}

export default function Hotels() {
  const [open, setOpen] = useState(null)

  const items = [
    {
      name: 'Hotel Reesenhof **',
      logoText: 'Hotel Reesenhof',
      addr: 'Bodenborn 64–66b, 58452 Witten-Bommern',
      price: 'EZ ab ~70–90 € · DZ ab ~95–120 €',
      distanceValue: 2,
      distance: 'Sehr nah: ca. 1,5–2 km · ~4–6 Min mit dem Auto',
      link: 'https://www.hotel-reesenhof.de/',
      booking:
        'https://www.booking.com/searchresults.de.html?ss=Hotel%20Reesenhof%20Witten',
      map: 'https://www.google.com/maps/search/?api=1&query=Hotel+Reesenhof+Bodenborn+Witten',
      note:
        'Familiär geführtes Hotel im Stadtteil Bommern, unweit Ruhrtalradweg und Kemnader See. Restaurant, Biergarten und Eisdiele im Haus; Supermarkt & Läden fußläufig. Beliebt bei Radfahrern und Gästen, die möglichst schnell am Strand des blue:beach sein wollen.',
      imgs: [
        'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop'
      ]
    },
    {
      name: 'Ringhotel Parkhotel Witten ***',
      logoText: 'Parkhotel Witten',
      addr: 'Bergerstraße 23, 58452 Witten',
      price: 'EZ ab ~90 € · DZ ab ~110 € (je nach Datum)',
      distanceValue: 5,
      distance: 'ca. 5 km · ~10 Min mit dem Auto',
      link: 'https://riepe.com/witten/',
      booking:
        'https://www.booking.com/searchresults.de.html?ss=Ringhotel%20Parkhotel%20Witten',
      map: 'https://www.google.com/maps/search/?api=1&query=Ringhotel+Parkhotel+Witten',
      note:
        'Zentral in Witten, direkt am Saalbau/Haus Witten. Mit Innenpool, kleiner Saunalandschaft und Dachcafé mit Panoramablick. Bahnhof Witten ist bequem zu Fuß erreichbar – ideal für Bahnreisende mit kurzer Anfahrt zum blue:beach.',
      imgs: [
        '/ringhotel-parkhotel-standardzimmer01.jpg',
        '/ringhotel-parkhotel-doppelzimmer01.jpg',
        '/ringhotel-parkhotel-pool02.jpg'
      ]
    },
    {
      name: 'Ardey Hotel ****',
      logoText: 'Ardey Hotel',
      addr: 'Ardeystraße 11–13, 58452 Witten',
      price: 'EZ ~105–125 € · DZ ~130–150 € (inkl. Frühstück, je nach Datum)',
      distanceValue: 6,
      distance: 'ca. 5–6 km · ~10–12 Min mit dem Auto',
      link: 'https://www.ardey-hotel.de/',
      booking:
        'https://www.booking.com/searchresults.de.html?ss=Ardey%20Hotel%20Witten',
      map: 'https://www.google.com/maps/search/?api=1&query=Ardey+Hotel+Witten',
      note:
        'Modernes, barrierefreies 4-Sterne-Hotel mit Restaurant, Hotelbar und kleiner Wellness-/Saunaecke. Ruhige Lage nahe Innenstadt und trotzdem gute Anbindung. Geeignet für Tagungen, Geschäftsreisende und Gäste mit Komfortanspruch.',
      imgs: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop'
      ]
    },
    {
      name: 'Hotel Haus Hohenstein ***',
      logoText: 'Haus Hohenstein',
      addr: 'Hohenstein 32, 58453 Witten',
      price: 'meist ~80–130 € (abhängig von Saison & Belegung)',
      distanceValue: 7,
      distance: 'ca. 6–7 km · ~12–15 Min mit dem Auto',
      link: 'https://www.hohenstein-witten.de/',
      booking:
        'https://www.booking.com/searchresults.de.html?ss=Haus%20Hohenstein%20Witten',
      map: 'https://www.google.com/maps/search/?api=1&query=Haus+Hohenstein+Witten',
      note:
        'Ruhiges 3-Sterne-Hotel mitten im Naherholungsgebiet Hohenstein. Viel Natur, Spazierwege, Restaurant und Terrasse/Biergarten. Ideal, wenn man abends noch im Grünen sitzen möchte, aber trotzdem schnell wieder in der Stadt oder am See ist.',
      imgs: [
        'https://images.unsplash.com/photo-1517840933442-d2dd2779a6df?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519710884009-0e5890894a85?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop'
      ]
    },
    {
      name: 'Hotel Hoppe **',
      logoText: 'Hotel Hoppe',
      addr: 'Stockumer Straße 6, 58453 Witten-Annen',
      price: 'eher günstig: meist ~70–100 €',
      distanceValue: 7.5,
      distance: 'ca. 7 km · ~12–15 Min mit dem Auto',
      link: 'https://www.hotelhoppe.com/',
      booking:
        'https://www.booking.com/searchresults.de.html?ss=Hotel%20Hoppe%20Witten',
      map: 'https://www.google.com/maps/search/?api=1&query=Hotel+Hoppe+Witten',
      note:
        'Einfaches, sauberes 2-Sterne-Hotel mit gutem Preis-Leistungs-Verhältnis. Nahe S-Bahnhof Witten-Annen Nord. Praktisch für Monteure, Teams und alle, die günstig übernachten möchten und mit dem Auto schnell am blue:beach sind.',
      imgs: [
        'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop'
      ]
    },
    {
      name: 'H+ Hotel Bochum ****',
      logoText: 'H+ Hotel Bochum',
      addr: 'Stadionring 22, 44791 Bochum',
      price: '4★ · oft ~110–160 € (je nach Event, z. B. Starlight Express)',
      distanceValue: 12,
      distance: 'ca. 11–13 km · ~15–20 Min mit dem Auto',
      link: 'https://www.h-hotels.com/de/hplus/hotels/hplus-hotel-bochum',
      booking:
        'https://www.booking.com/searchresults.de.html?ss=H%2B%20Hotel%20Bochum',
      map: 'https://www.google.com/maps/search/?api=1&query=H%2B+Hotel+Bochum',
      note:
        'Komfortables 4-Sterne-Hotel direkt am Starlight Express Theater, RuhrCongress und Ruhrstadion. Klimatisierte Zimmer, Restaurant & Bar – sehr gut, wenn ihr blue:beach mit Musical, Stadion oder Stadtbummel in Bochum kombinieren wollt.',
      imgs: [
        'https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop'
      ]
    }
  ]

  const sortedItems = [...items].sort((a, b) => a.distanceValue - b.distanceValue)

  return (
   <div className="page py-8 px-4 md:px-6 bg-slate-50">
  <SEO
    title="Hotelinfos"
    description="Hotels in Witten & Bochum nach Entfernung zum blue:beach Witten sortiert."
  />

  <div className="max-w-6xl mx-auto">
    <div className="mb-4">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
        Hotels nahe blue:beach Witten
      </h2>
    </div>

    <p className="mb-6 text-slate-600 text-sm md:text-base">
      Die folgende Übersicht zeigt Hotels in Witten & Bochum, nach Entfernung zum
      <span className="font-semibold"> blue:beach Witten</span> sortiert. Preise & Fahrzeiten sind
      Richtwerte und können je nach Datum, Verkehr und Verfügbarkeit schwanken.
    </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sortedItems.map((h, i) => (
            <Card
              key={i}
              className="h-full flex flex-col bg-white/80 backdrop-blur-sm border border-slate-100"
              title={
                <div className="flex items-center gap-2">
                  <Logo text={h.logoText} />
                  <span className="text-sm md:text-base font-semibold">{h.name}</span>
                </div>
              }
            >
              {/* kleine Sektion-Überschrift */}
              <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">
                Übersicht
              </div>

              {/* HERVORGEHOBENES ENTFERNUNGS-KÄSTCHEN */}
              <div className="mt-1 mb-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <div className="shrink-0 mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-soft text-lg">
                  🚗
                </div>
                <div className="text-sm leading-snug">
                  <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-semibold">
                    Entfernung zum blue:beach
                  </div>
                  <div className="font-semibold text-emerald-900">
                    {h.distance}
                  </div>
                </div>
              </div>

              <p className="text-sm">
                <b>Adresse:</b> {h.addr}
              </p>
              <p className="text-sm">
                <b>Preisrahmen:</b> {h.price}
              </p>

              <div className="flex flex-wrap gap-2 my-3 text-[11px]">
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🥐 Frühstück (oft zubuchbar)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  📶 WLAN
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🅿️ Parkmöglichkeiten
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🍽️ Restaurant/Bar (je nach Hotel)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🧖 Wellness/Pool (teilweise)
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                {h.note}
              </p>

              <div className="mt-1 mb-3 flex flex-wrap gap-2 text-sm">
                <a
                  className="px-3 py-2 rounded-xl bg-white shadow-soft border hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-150"
                  target="_blank"
                  rel="noreferrer"
                  href={h.link}
                >
                  🌐 Hotel-Website
                </a>
                <a
                  className="px-3 py-2 rounded-xl bg-white shadow-soft border hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-150"
                  target="_blank"
                  rel="noreferrer"
                  href={h.booking}
                >
                  🛏️ Auf Booking ansehen
                </a>
                <a
                  className="px-3 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:brightness-105 hover:-translate-y-0.5 transition-all duration-150"
                  target="_blank"
                  rel="noreferrer"
                  href={h.map}
                >
                  📍 Auf Karte anzeigen
                </a>
              </div>

              {/* BILDER – am Ende, mit Hover-Effekt */}
              <div className="grid grid-cols-3 gap-2 mt-auto">
                {h.imgs.slice(0, 3).map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setOpen(src)}
                    className="group relative rounded-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <img
                      alt={`${h.name} Bild ${idx + 1}`}
                      src={src}
                      loading="lazy"
                      className="w-full h-[90px] object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity" />
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Lightbox src={open} onClose={() => setOpen(null)} />
    </div>
  )
}
