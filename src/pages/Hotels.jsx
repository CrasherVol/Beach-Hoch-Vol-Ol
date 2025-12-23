import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";
import { useMemo, useState } from "react";

function Badge({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-full bg-white/80 shadow-soft border border-slate-200 text-[10px] sm:text-[11px] text-slate-700">
      {children}
    </span>
  );
}

function Pill({ title, children }) {
  return (
    <div className="px-3 py-2 rounded-2xl bg-white/85 backdrop-blur border border-slate-200 shadow-soft text-xs sm:text-sm text-slate-700">
      <div className="uppercase tracking-wide text-[10px] sm:text-[11px] text-slate-500 font-semibold">
        {title}
      </div>
      <div className="mt-0.5 text-slate-900 font-semibold">{children}</div>
    </div>
  );
}

function SectionTitle({ children, note }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold">
        {children}
      </h2>
      {note ? (
        <p className="text-[11px] sm:text-xs text-slate-500">{note}</p>
      ) : null}
    </div>
  );
}

function Toggle({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tab ${active ? "tab-active" : ""}`}
    >
      {children}
    </button>
  );
}

/**
 * Grobe Taxi-Schätzung (sehr konservativ, transparent als Orientierung):
 * Grundpreis 6–8 €, km-Preis 2,0–3,0 €.
 */
function taxiEstimateRange(km) {
  const baseMin = 6;
  const baseMax = 8;
  const perKmMin = 2.0;
  const perKmMax = 3.0;

  const min = Math.round(baseMin + km * perKmMin);
  const max = Math.round(baseMax + km * perKmMax);
  return [min, max];
}

/**
 * NähelabeI für Gäste (rein UX).
 */
function proximityLabel(km) {
  if (km <= 5) return { text: "sehr nah", emoji: "✅" };
  if (km <= 10) return { text: "nah", emoji: "👍" };
  return { text: "weiter", emoji: "↗️" };
}

export default function Hotels() {
  const items = [
    {
      name: "Hotel Reesenhof **",
      addr: "Bodenborn 64–66b, 58452 Witten-Bommern",
      price: "EZ ab ~70–90 € · DZ ab ~95–120 €",
      // KORRIGIERT: laut deinem Google-Maps-Screenshot ~7,3 km
      distanceValue: 7.3,
      distance: "ca. 7,3 km · ~11–18 Min mit dem Auto (je nach Verkehr)",
      link: "https://www.hotel-reesenhof.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Hotel%20Reesenhof%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Hotel+Reesenhof+Bodenborn+Witten",
      note:
        "Familiär geführtes Hotel im Stadtteil Bommern. Restaurant, Biergarten & Eisdiele im Haus; Supermarkt & Läden fußläufig.",
      highlights: ["familiär", "Restaurant/Biergarten", "ruhiger Stadtteil"],
      tags: { price: "budget", train: false, wellness: false, quiet: true },
    },
    {
      name: "Ringhotel Parkhotel Witten ***",
      addr: "Bergerstraße 23, 58452 Witten",
      price: "EZ ab ~90 € · DZ ab ~110 €",
      // KORRIGIERT (aus Koordinaten abgeleitet, als ca. Fahrstrecke)
      distanceValue: 4.3,
      distance: "ca. 4–4,5 km · ~8–12 Min mit dem Auto",
      link: "https://riepe.com/witten/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Ringhotel%20Parkhotel%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Ringhotel+Parkhotel+Witten",
      note:
        "Zentral in Witten. Mit Pool, Sauna und Dachcafé. Bahnhof zu Fuß erreichbar – super für Bahnreisende.",
      highlights: ["zentral", "Pool/Sauna", "bahnhofsnah"],
      tags: { price: "mid", train: true, wellness: true, quiet: false },
    },
    {
      name: "Ardey Hotel ****",
      addr: "Ardeystraße 11–13, 58452 Witten",
      price: "EZ 105–125 € · DZ 130–150 €",
      // KORRIGIERT
      distanceValue: 4.6,
      distance: "ca. 4,5–5 km · ~10–14 Min mit dem Auto",
      link: "https://www.ardey-hotel.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Ardey%20Hotel%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Ardey+Hotel+Witten",
      note:
        "Modernes, ruhiges 4-Sterne-Hotel mit Bar, Restaurant und kleiner Wellnesszone.",
      highlights: ["modern", "ruhig", "4 Sterne"],
      tags: { price: "upper", train: false, wellness: true, quiet: true },
    },
    {
      name: "Hotel Haus Hohenstein ***",
      addr: "Hohenstein 32, 58453 Witten",
      price: "~80–130 €",
      // JETZT KORRIGIERT (Koordinaten erhalten)
      distanceValue: 6.0,
      distance: "ca. 6 km · ~12–18 Min mit dem Auto",
      link: "https://www.hohenstein-witten.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Haus%20Hohenstein%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Haus+Hohenstein+Witten",
      note:
        "Ruhig, mitten im Naherholungsgebiet. Terrasse, Restaurant, viel Natur – ideal zum Runterkommen.",
      highlights: ["Natur", "ruhig", "Terrasse"],
      tags: { price: "mid", train: false, wellness: false, quiet: true },
    },
    {
      name: "Hotel Hoppe **",
      addr: "Stockumer Straße 6, 58453 Witten-Annen",
      price: "70–100 €",
      // KORRIGIERT
      distanceValue: 8.1,
      distance: "ca. 8 km · ~15–20 Min mit dem Auto",
      link: "https://www.hotelhoppe.com/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Hotel%20Hoppe%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=Hotel+Hoppe+Witten",
      note:
        "Einfach, sauber, preiswert. Gute Lage am Bahnhof Witten-Annen Nord.",
      highlights: ["preiswert", "einfach", "bahnhofsnah"],
      tags: { price: "budget", train: true, wellness: false, quiet: false },
    },

    // zusätzliche Optionen (wenn Witten voll ist / Bahn / Bochum-Fallback)
    {
      name: "GEORG Hotel (Witten) ***",
      addr: "Witten (Annen) – gute ÖPNV-Option",
      price: "ca. 70–130 €",
      // KORRIGIERT
      distanceValue: 8.2,
      distance: "ca. 8 km · ~15–20 Min mit dem Auto",
      link: "https://www.georghotel.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=GEORG%20Hotel%20Witten",
      map: "https://www.google.com/maps/search/?api=1&query=GEORG+Hotel+Witten",
      note:
        "Praktische Alternative in Witten-Annen, oft sinnvoll für Bahnreisende oder wenn zentrale Optionen belegt sind.",
      highlights: ["Witten", "ÖPNV-Option", "gute Alternative"],
      tags: { price: "mid", train: true, wellness: false, quiet: false },
    },
    {
      name: "Hotel Schmerkötter (Bochum) ***",
      addr: "Auf dem Aspei 70, 44801 Bochum",
      price: "ca. 80–140 €",
      // KORRIGIERT
      distanceValue: 3.0,
      distance: "ca. 3 km · ~6–10 Min mit dem Auto",
      link: "https://hotel-schmerkoetter.de/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Hotel%20Schmerk%C3%B6tter%20Bochum",
      map: "https://www.google.com/maps/search/?api=1&query=Hotel+Schmerk%C3%B6tter+Auf+dem+Aspei+70+Bochum",
      note:
        "Gute Bochum-Alternative (Uni/Querenburg-Nähe) – sehr schnelle Strecke zum blue:beach.",
      highlights: ["Bochum", "sehr nah", "gute Lage"],
      tags: { price: "mid", train: false, wellness: false, quiet: false },
    },

    {
      name: "H+ Hotel Bochum ****",
      addr: "Stadionring 22, 44791 Bochum",
      price: "110–160 €",
      // KORRIGIERT
      distanceValue: 9.3,
      distance: "ca. 9 km · ~20–30 Min mit dem Auto",
      link: "https://www.h-hotels.com/de/hplus/hotels/hplus-hotel-bochum",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=H%2B%20Hotel%20Bochum",
      map: "https://www.google.com/maps/search/?api=1&query=H%2B+Hotel+Bochum",
      note:
        "Direkt am Musical Starlight Express. Modern, hell, klimatisiert – gute Option, wenn in Witten alles voll ist.",
      highlights: ["Bochum", "modern", "klimatisiert"],
      tags: { price: "upper", train: false, wellness: false, quiet: false },
    },
    {
      name: "Mercure Hotel Bochum City ****",
      addr: "Massenbergstraße 19–21, 44787 Bochum (direkt am Hbf)",
      price: "ca. 90–170 €",
      // KORRIGIERT
      distanceValue: 8.5,
      distance: "ca. 8–9 km · ~15–25 Min mit dem Auto",
      link: "https://all.accor.com/hotel/A007/index.en.shtml",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Mercure%20Hotel%20Bochum%20City",
      map: "https://www.google.com/maps/search/?api=1&query=Mercure+Hotel+Bochum+City+Massenbergstra%C3%9Fe+19-21",
      note:
        "Bochum Zentrum, direkt am Hauptbahnhof – super für Bahnreisende und als Fallback, wenn Witten ausgebucht ist.",
      highlights: ["Hbf-Nähe", "Bochum Zentrum", "Fallback"],
      tags: { price: "upper", train: true, wellness: false, quiet: false },
    },
    {
      name: "Welcome Parkhotel Bochum ****",
      addr: "Klinikstraße 43–45, 44791 Bochum",
      price: "ca. 100–180 €",
      // KORRIGIERT
      distanceValue: 9.3,
      distance: "ca. 9 km · ~20–30 Min mit dem Auto",
      link: "https://www.welcome-hotels.com/hotels/parkhotel-bochum/",
      booking:
        "https://www.booking.com/searchresults.de.html?ss=Welcome%20Parkhotel%20Bochum",
      map: "https://www.google.com/maps/search/?api=1&query=Welcome+Parkhotel+Bochum+Klinikstra%C3%9Fe+43-45",
      note:
        "Komfortable City-Option am Stadtpark – gut, wenn ihr ein klassisches 4-Sterne-Hotel bevorzugt.",
      highlights: ["komfortabel", "Stadtpark", "Bochum"],
      tags: { price: "upper", train: false, wellness: false, quiet: false },
    },
    {
      name: "B&B Hotel Dortmund-West",
      addr: "Provinzialstraße 92, 44388 Dortmund",
      price: "ca. 50–80 €",
      distanceValue: 7.3,
      distance: "ca. 7–8 km · ~12–18 Min mit dem Auto",
      link: "https://www.booking.com/hotel/de/b-b-dortmund-west.de.html",
      booking:
        "https://www.booking.com/hotel/de/b-b-dortmund-west.de.html?aid=your_affiliate_id",
      map: "https://www.google.com/maps/search/?api=1&query=B%26B+Hotel+Dortmund-West",
      note:
        "Preiswerte Übernachtungsmöglichkeit im Westen Dortmunds – saubere, einfache Zimmer, gut für Budget-Reisende.",
      highlights: ["preiswert", "Dortmund-West", "günstig"],
      tags: { price: "budget", train: false, wellness: false, quiet: false },
    },
    {
      name: "B&B Hotel Dortmund-City",
      addr: "Burgwall 5, 44135 Dortmund (nahe Hauptbahnhof)",
      price: "ca. 60–90 €",
      distanceValue: 10.0,
      distance: "ca. 10 km · ~15–25 Min mit dem Auto / gute ÖPNV-Anbindung",
      link: "https://www.hotel-bb.com/de/hotel/dortmund-city",
      booking:
        "https://www.booking.com/hotel/de/b-b-dortmund-city.de.html?aid=your_affiliate_id",
      map: "https://www.google.com/maps/search/?api=1&query=B%26B+Hotel+Dortmund-City",
      note:
        "Preiswerte City-Option direkt am Dortmund Hbf – ideal, wenn du mit der Bahn kommst.",
      highlights: ["preiswert", "City & Hbf-Nähe", "gute Anbindung"],
      tags: { price: "budget", train: true, wellness: false, quiet: false },
    },
  ];

  const [sort, setSort] = useState("distance"); // distance | price
  const [filter, setFilter] = useState("all"); // all | near | budget | train | wellness | quiet

  const sortedAndFiltered = useMemo(() => {
    const list = [...items];

    // Filter
    const filtered =
      filter === "all"
        ? list
        : list.filter((h) => {
            if (filter === "near") return h.distanceValue <= 6;
            if (filter === "budget") return h.tags?.price === "budget";
            if (filter === "train") return Boolean(h.tags?.train);
            if (filter === "wellness") return Boolean(h.tags?.wellness);
            if (filter === "quiet") return Boolean(h.tags?.quiet);
            return true;
          });

    // Sort
    if (sort === "distance") {
      filtered.sort((a, b) => a.distanceValue - b.distanceValue);
    } else if (sort === "price") {
      const rank = { budget: 0, mid: 1, upper: 2 };
      filtered.sort(
        (a, b) => (rank[a.tags?.price] ?? 9) - (rank[b.tags?.price] ?? 9)
      );
    }

    return filtered;
  }, [items, sort, filter]);

  const recommended = useMemo(() => {
    const by = (fn) =>
      items
        .filter(fn)
        .sort((a, b) => a.distanceValue - b.distanceValue)[0] || null;

    const pickNear = by((h) => h.distanceValue <= 3) || items[0];
    const pickTrain = by((h) => h.tags?.train) || items[1];
    const pickWellness = by((h) => h.tags?.wellness) || items[2];

    return [
      { label: "Wenn du es super nah willst", icon: "🚗", item: pickNear },
      { label: "Wenn du mit der Bahn kommst", icon: "🚆", item: pickTrain },
      { label: "Wenn du Komfort/Wellness magst", icon: "🧖", item: pickWellness },
    ];
  }, [items]);

  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6 bg-slate-50">
      <SEO
        title="Übernachten nach der Hochzeit"
        description="Hotel-Tipps in Witten & Bochum – ohne Bilder, dafür mit schnellen Empfehlungen, Filtern und direkten Links."
      />

      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <section className="mb-6 sm:mb-8 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-5 sm:p-7 shadow-soft">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold mb-1">
            ÜBERNACHTEN
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            Hotel-Tipps rund um blue:beach Witten
          </h1>

          <p className="mt-2 text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl">
            Damit ihr nach der Feier nicht lange überlegen müsst: Hier sind
            Optionen in der Nähe – mit Entfernung, Preisrahmen und direkten Links
            zu Website, Booking und Karte. Wenn Witten voll ist, sind Bochum-Optionen
            meist der beste Plan B.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>🚗 nach Entfernung/Preis sortierbar</Badge>
            <Badge>🎯 schnelle Empfehlungen</Badge>
            <Badge>🔗 Website · Booking · Karte</Badge>
            <Badge>🚕 Taxi grob als Orientierung</Badge>
          </div>

          <p className="mt-3 text-[11px] sm:text-xs text-slate-500 max-w-3xl">
            Hinweis: Entfernungen sind als <b>ca. Fahrstrecke</b> angegeben (aus
            Koordinaten abgeleitet). Je nach Route/Verkehr kann das abweichen –
            zur finalen Planung bitte kurz die Kartenlinks nutzen.
          </p>
        </section>

        {/* QUICK PICKS */}
        <section className="mb-7">
          <SectionTitle note="Drei schnelle Empfehlungen – je nachdem, was dir wichtig ist.">
            Schnell entscheiden
          </SectionTitle>

          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {recommended.map((r, idx) => {
              const prox = proximityLabel(r.item.distanceValue);
              const [tMin, tMax] = taxiEstimateRange(r.item.distanceValue);

              return (
                <Card
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm border border-slate-100"
                  title={
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm sm:text-base font-semibold text-slate-900">
                          {r.icon} {r.label}
                        </div>
                        <div className="mt-1 text-[11px] sm:text-xs text-slate-500">
                          Empfehlung: {r.item.name}
                        </div>
                      </div>
                      <div className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-3 py-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-emerald-900">
                          {r.item.distanceValue} km
                        </span>
                      </div>
                    </div>
                  }
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge>
                      {prox.emoji} {prox.text}
                    </Badge>
                    <Badge>🚕 Taxi grob: {tMin}–{tMax} €</Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {r.item.note}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      className="btn-white text-xs sm:text-sm px-4 py-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={r.item.map}
                    >
                      📍 Karte
                    </a>
                    <a
                      className="btn-primary text-xs sm:text-sm px-4 py-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={r.item.booking}
                    >
                      🛏️ Booking
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
   {/* EXTRA VALUE: MINI-GUIDE */}
        <section className="mt-10">
          <Card
            className="bg-white/85 backdrop-blur border border-slate-200"
            title="Mini-Guide: So findet ihr schnell das passende Hotel"
          >
            <div className="grid gap-3 md:grid-cols-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="font-semibold text-emerald-800 mb-1">
                  Wenn ihr es möglichst kurz wollt
                </div>
                <p className="text-emerald-900">
                  Sortiere nach Entfernung und nimm „sehr nah“ – nach später Stunde
                  ist das einfach am entspanntesten.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="font-semibold text-sky-800 mb-1">
                  Wenn ihr mit der Bahn kommt
                </div>
                <p className="text-sky-900">
                  Filter „Bahnfreundlich“ und prüfe die Lage zum Bahnhof. Das spart
                  Taxi-Fahrten und Nerven.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="font-semibold text-rose-800 mb-1">
                  Wenn Witten voll ist
                </div>
                <p className="text-rose-900">
                  Bochum ist ein guter Plan B: mehr Auswahl, trotzdem gut erreichbar.
                  Karte öffnen und Verfügbarkeit checken.
                </p>
              </div>
            </div>

            <p className="mt-4 text-[11px] sm:text-xs text-slate-500">
              Hinweis Taxi: Die Beträge sind nur grobe Orientierung (je nach Anbieter,
              Uhrzeit, Verkehr und Route). Für eine genaue Zahl bitte direkt in der Taxi-App prüfen.
            </p>
          </Card>
        </section>


        {/* CONTROLS */}
        <section className="mb-5">
          <SectionTitle note="Filtert nach Bedarf und sortiert dann die Liste.">
            Liste anpassen
          </SectionTitle>

          <div className="mt-3 rounded-3xl bg-white/80 backdrop-blur border border-slate-200 shadow-soft p-4 sm:p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
                  Filtern
                </div>
                <div className="flex flex-wrap gap-2">
                  <Toggle active={filter === "all"} onClick={() => setFilter("all")}>
                    Alle
                  </Toggle>
                  <Toggle active={filter === "near"} onClick={() => setFilter("near")}>
                    Nah (≤ 6 km)
                  </Toggle>
                  <Toggle
                    active={filter === "budget"}
                    onClick={() => setFilter("budget")}
                  >
                    Preiswert
                  </Toggle>
                  <Toggle
                    active={filter === "train"}
                    onClick={() => setFilter("train")}
                  >
                    Bahnfreundlich
                  </Toggle>
                  <Toggle
                    active={filter === "wellness"}
                    onClick={() => setFilter("wellness")}
                  >
                    Wellness
                  </Toggle>
                  <Toggle
                    active={filter === "quiet"}
                    onClick={() => setFilter("quiet")}
                  >
                    Ruhig
                  </Toggle>
                </div>
              </div>

              <div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
                  Sortieren
                </div>
                <div className="flex flex-wrap gap-2">
                  <Toggle
                    active={sort === "distance"}
                    onClick={() => setSort("distance")}
                  >
                    Nach Entfernung
                  </Toggle>
                  <Toggle active={sort === "price"} onClick={() => setSort("price")}>
                    Nach Preisniveau
                  </Toggle>
                </div>

                <p className="mt-2 text-[11px] sm:text-xs text-slate-500">
                  Hinweis: Preisniveau ist grob (preiswert/mittel/gehoben) und dient
                  nur zur Orientierung.
                </p>
              </div>
            </div>
          </div>
        </section>

     

        {/* GRID */}
        <section>
          <SectionTitle
            note={`${sortedAndFiltered.length} ${
              sortedAndFiltered.length === 1 ? "Option" : "Optionen"
            } gefunden.`}
          >
            Hotel-Liste
          </SectionTitle>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sortedAndFiltered.map((h, i) => {
              const prox = proximityLabel(h.distanceValue);
              const [tMin, tMax] = taxiEstimateRange(h.distanceValue);

              return (
                <Card
                  key={i}
                  className="h-full flex flex-col bg-white/90 backdrop-blur-sm border border-slate-100"
                  title={
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                          {h.name}
                        </div>
                        <div className="mt-1 text-[11px] sm:text-xs text-slate-500">
                          {h.addr}
                        </div>
                      </div>

                      <div className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-3 py-2">
                        <span className="text-lg">🚗</span>
                        <span className="text-[11px] sm:text-xs font-semibold text-emerald-900">
                          {h.distanceValue} km
                        </span>
                      </div>
                    </div>
                  }
                >
                  {/* Quick-Badges */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge>
                      {prox.emoji} {prox.text}
                    </Badge>
                    <Badge>🚕 Taxi grob: {tMin}–{tMax} €</Badge>
                  </div>

                  {/* Key Facts */}
                  <div className="mt-1 grid gap-2">
                    <Pill title="Entfernung zum blue:beach">{h.distance}</Pill>
                    <Pill title="Preisrahmen">{h.price}</Pill>
                  </div>

                  {/* Highlights */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {h.highlights?.map((t, idx) => (
                      <Badge key={idx}>✨ {t}</Badge>
                    ))}
                  </div>

                  {/* Note */}
                  <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {h.note}
                  </p>

                  {/* Links */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      className="px-3 py-2 rounded-xl bg-white shadow-soft border border-slate-200 hover:border-emerald-300 hover:-translate-y-0.5 transition text-xs sm:text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={h.link}
                    >
                      🌐 Website
                    </a>
                    <a
                      className="px-3 py-2 rounded-xl bg-white shadow-soft border border-slate-200 hover:border-indigo-300 hover:-translate-y-0.5 transition text-xs sm:text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={h.booking}
                    >
                      🛏️ Booking
                    </a>
                    <a
                      className="px-3 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:brightness-105 hover:-translate-y-0.5 transition text-xs sm:text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={h.map}
                    >
                      📍 Karte
                    </a>
                  </div>

                  {/* Footer hint */}
                  <div className="mt-auto pt-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    <p className="mt-3 text-[11px] sm:text-xs text-slate-500">
                      Tipp: Wenn ihr mit dem Auto kommt, checkt kurz Parkmöglichkeiten
                      beim Hotel. Für Bahn: Lage zum Bahnhof anschauen.
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
