import { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

const DEST_NAME = "BlueBeach Witten";
const DEST_ADDR = "Luhnsmühle 2, 58455 Witten";
const DEST_QUERY = "BlueBeach+Witten+Luhnsm%C3%BChle+2+58455+Witten";

const ORIGINS = {
  duesseldorf: { label: "Düsseldorf", query: "D%C3%BCsseldorf" },
  reken: { label: "Reken", query: "Reken" },
  dortmund: { label: "Dortmund", query: "Dortmund" },
  muenster: { label: "Münster", query: "M%C3%BCnster" },
  duelmen: { label: "Dülmen", query: "D%C3%BClmen" },
  luedinghausen: { label: "Lüdinghausen", query: "L%C3%BCdinghausen" },
  custom: { label: "Eigener Ort …", query: "" }, // wird dynamisch befüllt
};

const MODES = {
  drive: { label: "Auto", param: "driving", apple: "d" },
  transit: { label: "ÖPNV", param: "transit", apple: "r" },
};

function googleRouteUrl(originQuery, modeParam) {
  return `https://www.google.com/maps/dir/?api=1&origin=${originQuery}&destination=${DEST_QUERY}&travelmode=${modeParam}`;
}

function appleMapsUrl({ originQuery, appleMode }) {
  // Apple Maps akzeptiert daddr/saddr als Freitext
  const daddr = encodeURIComponent(`${DEST_NAME}, ${DEST_ADDR}`);
  const dirflg = appleMode || "d";

  // saddr: wenn gesetzt, wird es als Startpunkt genutzt; sonst „aktueller Standort“
  const saddr = originQuery ? `&saddr=${originQuery}` : "";
  return `https://maps.apple.com/?daddr=${daddr}${saddr}&dirflg=${dirflg}`;
}

export default function Anfahrt() {
  const [origin, setOrigin] = useState("duesseldorf");
  const [customOrigin, setCustomOrigin] = useState("");
  const [mode, setMode] = useState("drive");

  const originQuery = useMemo(() => {
    if (origin === "custom") {
      const trimmed = customOrigin.trim();
      return trimmed ? encodeURIComponent(trimmed) : "";
    }
    return ORIGINS[origin]?.query || ORIGINS.duesseldorf.query;
  }, [origin, customOrigin]);

  const mapsUrl = useMemo(() => {
    const m = MODES[mode]?.param || MODES.drive.param;
    if (!originQuery) return "#";
    return googleRouteUrl(originQuery, m);
  }, [originQuery, mode]);

  const appleUrl = useMemo(() => {
    const appleMode = MODES[mode]?.apple || MODES.drive.apple;
    // Apple bekommt (falls vorhanden) originQuery als bereits encoded string (passt für URL)
    // Wenn custom leer ist, lassen wir saddr weg -> aktueller Standort
    const saddr = originQuery || "";
    return appleMapsUrl({ originQuery: saddr, appleMode });
  }, [originQuery, mode]);

  const routeDisabled = origin === "custom" && !customOrigin.trim();

  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6">
      <SEO
        title="Anfahrt – BlueBeach Witten"
        description="Adresse, Routenplaner (Auto/ÖPNV), Autobahnen und Parkhinweise für das BlueBeach in Witten."
      />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
          Anfahrt zum BlueBeach in Witten
        </h2>

        {/* Auswahl & Routenknopf */}
        <Card>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {/* Startort */}
              <label className="grid gap-1 text-sm">
                <span className="text-slate-600">Start</span>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="border rounded-xl px-3 py-2 bg-white/90"
                >
                  {Object.entries(ORIGINS).map(([key, v]) => (
                    <option key={key} value={key}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </label>

              {/* Eigener Ort (sichtbar nur bei custom) */}
              <label
                className={`grid gap-1 text-sm ${
                  origin === "custom" ? "opacity-100" : "opacity-60"
                }`}
              >
                <span className="text-slate-600">Eigener Ort</span>
                <input
                  className="border rounded-xl px-3 py-2 bg-white/90"
                  placeholder="z. B. Münster Hbf, Königstr. 1 …"
                  value={customOrigin}
                  onChange={(e) => setCustomOrigin(e.target.value)}
                  disabled={origin !== "custom"}
                />
              </label>

              {/* Modus */}
              <label className="grid gap-1 text-sm">
                <span className="text-slate-600">Modus</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(MODES).map(([key, v]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setMode(key)}
                      className={`px-3 py-2 rounded-xl border text-sm ${
                        mode === key
                          ? "bg-gradient-to-tr from-emerald-500 to-orange-400 text-white border-transparent"
                          : "bg-white text-slate-900"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </label>
            </div>

            {/* Route öffnen (Desktop / generell Google Maps) */}
            <a
              className={`hidden sm:inline-flex justify-center items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-white shadow-soft text-sm sm:text-base transition
                        ${
                          routeDisabled
                            ? "bg-slate-300 cursor-not-allowed"
                            : "bg-gradient-to-tr from-emerald-500 to-orange-400 hover:scale-[1.02]"
                        }`}
              href={mapsUrl}
              target={routeDisabled ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (routeDisabled) e.preventDefault();
              }}
              title={
                routeDisabled
                  ? "Bitte zuerst einen Ort eingeben"
                  : "In Google Maps öffnen"
              }
            >
              Route in Google&nbsp;Maps öffnen
            </a>

            {/* Mobile: Zwei Buttons (Apple Maps + Google Maps) */}
            <div className="sm:hidden grid gap-2">
              <a
                className={`inline-flex justify-center items-center px-4 py-3 rounded-xl text-white shadow-soft text-sm transition
                          ${
                            routeDisabled
                              ? "bg-slate-300 cursor-not-allowed"
                              : "bg-black/80 hover:brightness-110"
                          }`}
                href={appleUrl}
                target={routeDisabled ? "_self" : "_blank"}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (routeDisabled) e.preventDefault();
                }}
                title={
                  routeDisabled
                    ? "Bitte zuerst einen Ort eingeben"
                    : "In Apple Karten öffnen"
                }
              >
                In Apple Karten öffnen
              </a>

              <a
                className={`inline-flex justify-center items-center px-4 py-3 rounded-xl text-white shadow-soft text-sm transition
                          ${
                            routeDisabled
                              ? "bg-slate-300 cursor-not-allowed"
                              : "bg-gradient-to-tr from-emerald-500 to-orange-400 hover:scale-[1.01]"
                          }`}
                href={mapsUrl}
                target={routeDisabled ? "_self" : "_blank"}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (routeDisabled) e.preventDefault();
                }}
                title={
                  routeDisabled
                    ? "Bitte zuerst einen Ort eingeben"
                    : "In Google Maps öffnen"
                }
              >
                In Google Maps öffnen
              </a>
            </div>
          </div>

          {/* Mini-Hinweis */}
          <p className="mt-4 text-xs text-slate-500">
            Tipp: Wenn du „Eigener Ort …“ nutzt, gib am besten etwas Eindeutiges
            ein (z. B. „Münster Hbf“ oder eine Straße).
          </p>
        </Card>

        {/* Karte + Adresse */}
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <Card title="Adresse">
            <p className="text-sm sm:text-base">
              {DEST_NAME}
              <br />
              {DEST_ADDR.split(",")[0]}
              <br />
              {DEST_ADDR.split(",").slice(1).join(",").trim()}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                className="px-3 py-2 rounded-xl bg-white shadow-soft text-sm"
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${DEST_QUERY}`}
                rel="noopener noreferrer"
              >
                Standort in Maps
              </a>
              <a
                className="px-3 py-2 rounded-xl bg-white shadow-soft text-sm"
                target="_blank"
                href="https://www.openstreetmap.org/search?query=Luhnsm%C3%BChle%202%2058455%20Witten"
                rel="noopener noreferrer"
              >
                OpenStreetMap
              </a>
              <a
                className="px-3 py-2 rounded-xl bg-white shadow-soft text-sm sm:hidden"
                target="_blank"
                href={appleMapsUrl({ originQuery: "", appleMode: "d" })}
                rel="noopener noreferrer"
              >
                Apple Karten
              </a>
            </div>

            {/* Autobahnen */}
            <div className="mt-4">
              <div className="text-xs sm:text-sm text-slate-600 mb-1">
                Gute Anbindung über:
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-xs sm:text-sm">
                  A43 · AS Witten-Heven/Herbede
                </span>
                <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-xs sm:text-sm">
                  A44 · AS Witten-Annen / Bochum-Querenburg
                </span>
                <span className="px-3 py-1 rounded-full bg-white shadow-soft border text-xs sm:text-sm">
                  A45 (i. V. mit A40/A44)
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm mt-2">
                Folge den Schildern Richtung <b>Kemnader See / Heveney</b>. Die
                Zufahrt „Luhnsmühle“ führt direkt zur Location.
              </p>
            </div>
          </Card>

          <Card title="Karte">
            <div className="rounded-2xl overflow-hidden shadow-soft">
              <iframe
                title="BlueBeach Map"
                className="border-0 w-full h-[260px] sm:h-[320px] md:h-[340px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=BlueBeach%20Witten&output=embed"
              ></iframe>
            </div>
          </Card>
        </div>

        {/* Parken & ÖPNV & Schnell-Links */}
        <div className="grid gap-4 mt-4 lg:grid-cols-3">
          <Card title="Parken & Ankunft">
            <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm">
              <li>Parkplätze am Gelände vorhanden (beschildert „BlueBeach“).</li>
              <li>
                Drop-off nah am Eingang möglich (bitte Ein- und Ausfahrt
                freihalten).
              </li>
              <li>Bitte möglichst Fahrgemeinschaften bilden.</li>
            </ul>
          </Card>

          <Card title="ÖPNV – so kommst du hin">
            <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm">
              <li>
                Nahe Ziel-Haltestelle: <b>Freizeitbad Heveney</b> (Fußweg wenige
                Minuten).
              </li>
              <li>
                Ab <b>Witten Hbf</b> bzw. regional mit Bus/Bahn; je nach Startort
                variieren Verbindungen.
              </li>
              <li>
                Plane tagesaktuell über VRR/DB oder Google Maps (ÖPNV-Modus).
              </li>
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "duesseldorf",
                "reken",
                "dortmund",
                "muenster",
                "duelmen",
                "luedinghausen",
              ].map((key) => (
                <a
                  key={key}
                  className="px-3 py-2 rounded-xl bg-white shadow-soft text-xs sm:text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    ORIGINS[key]?.query
                      ? googleRouteUrl(ORIGINS[key].query, MODES.transit.param)
                      : "#"
                  }
                >
                  ÖPNV ab {ORIGINS[key].label}
                </a>
              ))}
            </div>

            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Hinweis: exakte Linien/Fahrzeiten tagesaktuell prüfen
              (VRR/DB/Google Maps).
            </p>
          </Card>

          <Card title="Noch hilfreich">
            <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm">
              <li>
                <b>Adresse fürs Navi:</b> {DEST_ADDR}
              </li>
              <li>
                <b>Taxi/Rideshare:</b> Abholung am Parkplatz „BlueBeach“ (gut
                beschildert).
              </li>
              <li>
                <b>Weg im Gelände:</b> Den Sandwegen und Palmen folgen.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
