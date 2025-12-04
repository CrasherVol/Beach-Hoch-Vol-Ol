import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { useState } from "react";

function Logo({ src, text }) {
  if (src) {
    return (
      <img
        alt={text || "Logo"}
        src={src}
        className="h-7 sm:h-8 md:h-9 object-contain"
      />
    );
  }
  return (
    <div className="px-3 py-1 rounded-full bg-white shadow-soft border inline-block font-bold text-xs sm:text-sm">
      {text}
    </div>
  );
}

export default function Hotels() {
  const [open, setOpen] = useState(null);

  const items = [
    {
      name: "Hotel Reesenhof **",
      logoText: "Hotel Reesenhof",
      addr: "Bodenborn 64–66b, 58452 Witten-Bommern",
      price: "EZ ab ~70–90 € · DZ ab ~95–120 €",
      distanceValue: 2,
      distance: "Sehr nah: ca. 1,5–2 km · ~4–6 Min mit dem Auto",
      link: "https://www.hotel-reesenhof.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Hotel%20Reesenhof%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Hotel+Reesenhof+Bodenborn+Witten",
      note:
        "Familiär geführtes Hotel im Stadtteil Bommern, unweit Ruhrtalradweg und Kemnader See. Restaurant, Biergarten und Eisdiele im Haus; Supermarkt & Läden fußläufig.",
      imgs: [
        "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop",
      ],
    },

    {
      name: "Ringhotel Parkhotel Witten ***",
      logoText: "Parkhotel Witten",
      addr: "Bergerstraße 23, 58452 Witten",
      price: "EZ ab ~90 € · DZ ab ~110 €",
      distanceValue: 5,
      distance: "ca. 5 km · ~10 Min mit dem Auto",
      link: "https://riepe.com/witten/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Ringhotel%20Parkhotel%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Ringhotel+Parkhotel+Witten",
      note:
        "Zentral in Witten. Mit Pool, Sauna und Dachcafé. Bahnhof zu Fuß erreichbar. Ideal für Bahnreisende.",
      imgs: [
        "/ringhotel-parkhotel-standardzimmer01.jpg",
        "/ringhotel-parkhotel-doppelzimmer01.jpg",
        "/ringhotel-parkhotel-pool02.jpg",
      ],
    },

    {
      name: "Ardey Hotel ****",
      logoText: "Ardey Hotel",
      addr: "Ardeystraße 11–13, 58452 Witten",
      price: "EZ 105–125 € · DZ 130–150 €",
      distanceValue: 6,
      distance: "ca. 5–6 km · ~10–12 Min mit dem Auto",
      link: "https://www.ardey-hotel.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Ardey%20Hotel%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Ardey+Hotel+Witten",
      note:
        "Modernes, ruhiges 4-Sterne-Hotel mit Bar, Restaurant und kleiner Wellnesszone.",
      imgs: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop",
      ],
    },

    {
      name: "Hotel Haus Hohenstein ***",
      logoText: "Haus Hohenstein",
      addr: "Hohenstein 32, 58453 Witten",
      price: "~80–130 €",
      distanceValue: 7,
      distance: "ca. 6–7 km · ~12–15 Min mit dem Auto",
      link: "https://www.hohenstein-witten.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Haus%20Hohenstein%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Haus+Hohenstein+Witten",
      note:
        "Ruhig, mitten im Naherholungsgebiet. Terrasse, Restaurant, viel Natur.",
      imgs: [
        "https://images.unsplash.com/photo-1517840933442-d2dd2779a6df?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519710884009-0e5890894a85?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop",
      ],
    },

    {
      name: "Hotel Hoppe **",
      logoText: "Hotel Hoppe",
      addr: "Stockumer Straße 6, 58453 Witten-Annen",
      price: "70–100 €",
      distanceValue: 7.5,
      distance: "ca. 7 km · ~12–15 Min",
      link: "https://www.hotelhoppe.com/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Hotel%20Hoppe%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Hotel+Hoppe+Witten",
      note:
        "Einfach, sauber, preiswert. Gute Lage am Bahnhof Witten-Annen Nord.",
      imgs: [
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop",
      ],
    },

    {
      name: "H+ Hotel Bochum ****",
      logoText: "H+ Hotel Bochum",
      addr: "Stadionring 22, 44791 Bochum",
      price: "110–160 €",
      distanceValue: 12,
      distance: "ca. 11–13 km · 15–20 Min",
      link: "https://www.h-hotels.com/de/hplus/hotels/hplus-hotel-bochum",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=H%2B%20Hotel%20Bochum",
      map: "https://www.google.com/maps/search/?api=1&query=H%2B+Hotel+Bochum",
      note:
        "Direkt am Musical Starlight Express. Modern, hell, klimatisiert.",
      imgs: [
        "https://images.unsplash.com/photo-1501117716987-c8e2a3a67a0d?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop",
      ],
    },
  ];

  const sortedItems = [...items].sort(
    (a, b) => a.distanceValue - b.distanceValue
  );

  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6 bg-slate-50">
      <SEO
        title="Hotelinfos"
        description="Hotels in Witten & Bochum nach Entfernung zum blue:beach sortiert."
      />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4">
          Hotels nahe blue:beach Witten
        </h2>

        <p className="mb-6 text-slate-600 text-sm sm:text-base leading-relaxed">
          Die folgende Übersicht zeigt Hotels in Witten & Bochum – sortiert nach
          Entfernung zum <b>blue:beach Witten</b>. Preise & Fahrzeiten können je
          nach Datum & Verfügbarkeit schwanken.
        </p>

        {/* GRID – mobile 1 Spalte, Tablet 2, Desktop 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sortedItems.map((h, i) => (
            <Card
              key={i}
              className="h-full flex flex-col bg-white/90 backdrop-blur-sm border border-slate-100"
              title={
                <div className="flex items-center gap-2">
                  <Logo text={h.logoText} />
                  <span className="text-sm sm:text-base font-semibold">
                    {h.name}
                  </span>
                </div>
              }
            >
              {/* INFO HEADER */}
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-400 mb-1">
                Übersicht
              </div>

              {/* ENTFERNUNG */}
              <div className="mt-1 mb-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <div className="shrink-0 inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white shadow-soft text-lg">
                  🚗
                </div>
                <div className="text-xs sm:text-sm leading-snug">
                  <div className="uppercase tracking-wide text-emerald-700 font-semibold text-[10px] sm:text-[11px]">
                    Entfernung zum blue:beach
                  </div>
                  <div className="font-semibold text-emerald-900 text-sm sm:text-base">
                    {h.distance}
                  </div>
                </div>
              </div>

              {/* ADDRESS */}
              <p className="text-sm mb-1">
                <b>Adresse:</b> {h.addr}
              </p>
              <p className="text-sm mb-2">
                <b>Preisrahmen:</b> {h.price}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 my-3 text-[10px] sm:text-[11px]">
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🥐 Frühstück
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  📶 WLAN
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🅿️ Parken
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🍽️ Restaurant/Bar
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white shadow-soft border">
                  🧖 Wellness/Pool (teilweise)
                </span>
              </div>

              {/* NOTE */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                {h.note}
              </p>

              {/* LINKS */}
              <div className="mt-1 mb-3 flex flex-wrap gap-2 text-xs sm:text-sm">
                <a
                  className="px-3 py-2 rounded-xl bg-white shadow-soft border hover:border-emerald-300 hover:-translate-y-0.5 transition"
                  target="_blank"
                  rel="noreferrer"
                  href={h.link}
                >
                  🌐 Website
                </a>
                <a
                  className="px-3 py-2 rounded-xl bg-white shadow-soft border hover:border-indigo-300 hover:-translate-y-0.5 transition"
                  target="_blank"
                  rel="noreferrer"
                  href={h.booking}
                >
                  🛏️ Booking
                </a>
                <a
                  className="px-3 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:brightness-105 hover:-translate-y-0.5 transition"
                  target="_blank"
                  rel="noreferrer"
                  href={h.map}
                >
                  📍 Karte
                </a>
              </div>

              {/* BILDER */}
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
                      className="w-full h-[85px] sm:h-[95px] md:h-[110px] object-cover transition-transform duration-200 group-hover:scale-105"
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
  );
}
