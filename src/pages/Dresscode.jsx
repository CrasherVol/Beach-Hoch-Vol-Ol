import { useState } from "react";
import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

const SWATCHES = [
  { name: "Sand", hex: "#f4e7c6" },
  { name: "Koralle", hex: "#fb7185" },
  { name: "Türkis", hex: "#38bdf8" },
  { name: "See", hex: "#60a5fa" },
  { name: "Weiß", hex: "#ffffff" },
];

const MOOD = [
  { alt: "Hängematte & Sunset", src: "/assets/hero-hammock.jpg" },
  { alt: "Feiern mit Drinks", src: "/assets/party-drinks.png" },
  { alt: "BlueBeach außen", src: "/assets/bb-outdoor.webp" },
  { alt: "Beach-Details", src: "/assets/beach-details.jpg" }, // Platzhalter ok
];

const IDEAS_SHE = [
  {
    title: "Leichtes Sommerkleid",
    note: "Leinen/Chiffon, Midi/Maxi, gern schwingend",
    icon: "👗",
  },
  {
    title: "Elegante Sandalen",
    note: "flach oder Keil – sicher im Sand",
    icon: "🩴",
  },
  {
    title: "Feine Accessoires",
    note: "z. B. Perlen, Gold, Tuch, Statement-Ohrringe",
    icon: "💍",
  },
];

const IDEAS_HE = [
  {
    title: "Leinenhemd / lockeres Hemd",
    note: "weiß, ecru oder pastell – gern leicht gekrempelt",
    icon: "👔",
  },
  {
    title: "Chino/Leinenhose",
    note: "hell; je nach Wohlfühlen auch Shorts okay",
    icon: "🩳",
  },
  {
    title: "Leichte Loafer/Sneaker",
    note: "sauber, sandtauglich – gern Slip-Ons",
    icon: "👟",
  },
];

const IDEAS_UNI = [
  {
    title: "Pastell & Naturtöne",
    note: "Sand, Koralle, Türkis, See-Blau, Weiß",
    icon: "🎨",
  },
  {
    title: "Sonnenhut / Shades",
    note: "praktisch, fotogen & very beachy",
    icon: "🕶️",
  },
  {
    title: "Leichte Layer",
    note: "Leinenblazer, Kimono, Strickjacke für später",
    icon: "🧥",
  },
];

export default function Dresscode() {
  const [tab, setTab] = useState("uni");

  const ideaList =
    tab === "she" ? IDEAS_SHE : tab === "he" ? IDEAS_HE : IDEAS_UNI;

  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6 bg-slate-50">
      <SEO
        title="Dresscode – Elegant & Beachy"
        description="Inspirationen für elegante Strandoutfits im BlueBeach: Farben, Moodboard, Do/Don't und Outfitideen."
      />

      <div className="max-w-6xl mx-auto">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl p-4 sm:p-6 bg-white/70 backdrop-blur-sm shadow-soft">
          {/* schwebende Emojis */}
          <div className="absolute -top-6 left-4 sm:left-6 float-slow">👒</div>
          <div className="absolute -top-4 right-6 sm:right-10 float-slower delay-150">
            🕶️
          </div>
          <div className="absolute bottom-0 left-6 sm:left-10 float-slower delay-300">
            🩴
          </div>
          <div className="absolute -bottom-3 right-4 sm:right-8 float-slow">
            🏖️
          </div>

          <div className="relative">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold mb-1">
              DRESSCODE
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Elegant & beachy –{" "}
              <span className="grad-text">leicht, luftig, fotogen</span>
            </h2>
            <p className="mt-2 text-slate-700 max-w-[900px] text-sm md:text-base">
              Wir feiern im <strong>Sand des BlueBeach</strong> – mit Palmen,
              Lichterkette und Strandbar-Feeling. Denkt an{" "}
              <strong>Sommerstoffe</strong> (Leinen, Chiffon),
              <strong> helle Töne</strong> (Sand, Türkis, Koralle) und
              <strong> bequeme Schuhe</strong> für den Sand. Es geht um{" "}
              <strong>Beach Chic</strong>: entspannt, sommerlich, gerne etwas
              schicker – aber kein Kostümzwang.
            </p>

            {/* Farbswatches */}
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
              {SWATCHES.map((s) => (
                <div
                  key={s.name}
                  className="swatch flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-soft border text-xs md:text-sm"
                >
                  <span
                    className="swatch-dot inline-block w-4 h-4 rounded-full border"
                    style={{ background: s.hex }}
                  />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>

            {/* Kurz & Knapp */}
            <div className="mt-4 grid gap-3 md:grid-cols-3 text-xs md:text-sm">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="font-semibold text-emerald-800 mb-1">
                  Kurz & knapp
                </div>
                <p className="text-emerald-900">
                  Sommerlich schick, strandtauglich, gern farbig. Eher
                  „Beach-Party“ als „Ballkleid/Anzugspflicht“.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="font-semibold text-sky-800 mb-1">Level</div>
                <p className="text-sky-900">
                  <strong>Smart Casual / Beach Chic</strong>: Du kannst danach
                  genauso noch in eine Strandbar gehen.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="font-semibold text-rose-800 mb-1">
                  Wichtigste Regel
                </div>
                <p className="text-rose-900">
                  Ihr sollt euch wohlfühlen – lieber entspannt & beachy als
                  overdressed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* kleines Mood-Strip mit vorhandenen MOOD-Bildern */}
        <section className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-2">
            <h3 className="text-base sm:text-lg font-semibold">
              Feeling: So ungefähr darf es aussehen
            </h3>
            <span className="text-[11px] text-slate-500">
              Keine Pflicht, nur Inspiration – alles darf, nichts muss.
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MOOD.map((m, i) => (
              <figure
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-soft bg-slate-100"
              >
                <img
                  src={m.src}
                  alt={m.alt}
                  className="w-full h-[140px] sm:h-[160px] object-cover hover:scale-[1.03] transition-transform duration-300"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-black/40 text-[10px] sm:text-[11px] text-white px-2 py-1">
                  {m.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Moodboard – Outfit-Inspiration */}
        <section className="mt-8">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Moodboard – Outfit-Inspiration
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mb-3">
            Hier ein buntes Moodboard aus Strand-, Sommer- und
            Beach-Party-Looks. Lass dich einfach inspirieren – du musst nichts
            1:1 so tragen.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[...Array(16)].map((_, i) => (
              <img
                key={i}
                src={`/Stil-${i + 1}.jpg`}
                alt={`Beach Wedding Stil ${i + 1}`}
                onError={(e) => {
                  e.currentTarget.src = "/assets/sunset-palm.jpg"; // Fallback
                }}
                className="w-full h-[190px] sm:h-[210px] md:h-[230px] object-cover object-top rounded-2xl shadow-soft hover:scale-[1.03] hover:rotate-[0.5deg] transition-transform duration-300 cursor-pointer"
              />
            ))}
          </div>
        </section>

        {/* Tabs: Für Sie / Für Ihn / Unisex */}
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTab("uni")}
                className={`tab ${tab === "uni" ? "tab-active" : ""}`}
              >
                Unisex-Ideen
              </button>
              <button
                onClick={() => setTab("she")}
                className={`tab ${tab === "she" ? "tab-active" : ""}`}
              >
                Für Sie
              </button>
              <button
                onClick={() => setTab("he")}
                className={`tab ${tab === "he" ? "tab-active" : ""}`}
              >
                Für Ihn
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Nur Beispiele – kombiniert gerne frei und so, wie es zu euch
              passt.
            </p>
          </div>

          <div className="grid gap-3 md:gap-4 md:grid-cols-3 mt-4">
            {ideaList.map((it, i) => (
              <div
                key={i}
                className="idea-card flex gap-3 p-3 rounded-2xl bg-white shadow-soft border border-slate-100"
              >
                <div className="text-2xl sm:text-3xl shrink-0">
                  {it.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">
                    {it.title}
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm">
                    {it.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Do / Don't */}
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <Card title="Do ✅">
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Leichte Stoffe (Leinen, Seide, Viskose, Chiffon)</li>
              <li>
                Helle, sommerliche Farben (Sand, Weiß, Koralle, Türkis,
                Pastelltöne)
              </li>
              <li>Bequeme Schuhe – flach oder Keil, die im Sand funktionieren</li>
              <li>
                Accessoires: Sonnenhut, Sonnenbrille, zarter oder „beachy“
                Schmuck
              </li>
              <li>Leichte Layer für später (Strick, Leinenblazer, Kimono)</li>
              <li>
                Smart-Casual-Kombis: z. B. helle Hose + Hemd / luftiges Kleid +
                Sandalen
              </li>
            </ul>
          </Card>
          <Card title="Don't ❌">
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Sehr schwere Stoffe & komplett dunkle Vollschwarz-Looks</li>
              <li>Sehr hohe, spitze Absätze (im Sand wirklich unpraktisch)</li>
              <li>
                Große Rucksäcke oder voluminöse Taschen (stören beim Feiern &
                Spielen)
              </li>
              <li>
                Zu sportlich: Jogginghose, Trikots o. Ä. passen weniger zum
                Beach Chic
              </li>
              <li>
                Allzu empfindliche Stoffe, die bei Sand/Drinks sofort Drama
                machen 😉
              </li>
            </ul>
          </Card>
        </section>

        {/* Mini-FAQ / Unsicherheiten nehmen */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Wie schick soll ich kommen?">
            <p className="text-xs sm:text-sm text-slate-700">
              Stell dir vor, du gehst auf eine schöne{" "}
              <strong>Sommerparty am Strand</strong>: schicker als Alltagslook,
              lockerer als Hochzeit/Abiball.
            </p>
          </Card>
          <Card title="Barfuß erlaubt?">
            <p className="text-xs sm:text-sm text-slate-700">
              Unbedingt! Barfuß oder mit Sandalen – ganz wie ihr mögt. Im Sand
              fühlt sich vieles automatisch entspannter an.
            </p>
          </Card>
          <Card title="Was, wenn ich unsicher bin?">
            <p className="text-xs sm:text-sm text-slate-700">
              Dann liegst du mit <strong>hellen Farben</strong>, einem
              <strong> luftigen Oberteil</strong> und
              <strong> bequemen Schuhen</strong> eigentlich nie falsch. Im
              Zweifel lieber sommerlich & entspannt statt zu schick.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
