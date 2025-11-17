import Card from '../components/Card.jsx'
import SEO from '../components/SEO.jsx'

export default function Ablauf() {
  // 👉 Datum auf 13.03. & Startzeit 18:00
  const dateStr = new Intl.DateTimeFormat('de-DE', { dateStyle: 'full' }).format(
    new Date('2026-03-13T18:00:00+01:00')
  )
  // 👉 Ablauf startet ab 18:00, ohne Essens-Programm
 const timeline = [
  {
    time: "18:00",
    timeLabel: "18:00",
    title: "Beachen, chillen & Spiele (Beachvolleyball und andere kleinere Spiele)",
    icon: "🏖️",
    color: "from-sky-400 to-emerald-400",
  },
  {
    time: "18:00",
    timeLabel: "18:00",
    title: "Eintreffen & Welcome-Drink",
    icon: "🍹",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    time: "18:30",
    timeLabel: "18:30",
    title: "Begrüßung Olga und Volker",
    icon: "💍",
    color: "from-orange-400 to-pink-400",
  },
  {
    time: "19:30",
    timeLabel: "19:30",
    title: "Fotos, Beachvolleyball & Chill",
    icon: "🏐",
    color: "from-cyan-400 to-sky-400",
  },
  {
    time: "21:00",
    timeLabel: "21:00",
    title: "Musik, Drinks & Strandfeeling",
    icon: "🎵",
    color: "from-pink-400 to-rose-400",
  },
  {
    time: "2:00",
    timeLabel: "2:00",
    title: "Alles Schöne hat ein Ende",
    icon: "🔥",
    color: "from-amber-500 to-red-400",
  },
];

  return (
    <div className="page py-8">
      <SEO
        title="Ablauf"
        description="Zeitplan & Getränke für den Abend – Start um 18 Uhr, ohne Essen."
      />

      <h2 className="text-3xl font-extrabold mb-2 text-center grad-text">
        🌴 Ablauf – {dateStr} 🌅
      </h2>

      <p className="text-center text-slate-600 mb-6 max-w-[640px] mx-auto">
        Der Abend soll sich anfühlen wie ein Urlaubstag mit Freunden – ohne Stress, dafür mit "Sonne im Herzen", Lachen & Musik.
        <br />
        <span className="font-semibold">
          Es gibt kein Essen vor Ort, nur Drinks – plant gerne ein, vorher etwas zu essen.
        </span>
      </p>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto mt-8">
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 via-cyan-300 to-orange-300 rounded-full opacity-40" />
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-10 ${
              idx % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Icon Bubble */}
            <div
              className={`relative z-10 flex items-center justify-center w-16 h-16 text-3xl text-white rounded-full shadow-lg bg-gradient-to-tr ${item.color} hover:scale-110 transition`}
            >
              {item.icon}
            </div>

            {/* Verbindungslinie */}
            <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />

            {/* Card */}
            <Card>
              <div className="flex flex-col text-center md:text-left">
                <span className="text-sm uppercase tracking-wide text-slate-500">
                  {item.timeLabel}
                </span>
                <h3 className="text-xl font-semibold mt-1 text-slate-800">{item.title}</h3>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Getränke & Stimmung (Essen entfernt) */}
      <div className="mt-12 grid lg:grid-cols-2 gap-6">
        <Card title="🍹 Getränke (kein Essen geplant)">
          <ul className="list-disc pl-6 text-slate-700 leading-relaxed">
            <li>Es gibt an diesem Abend <b>kein Essen</b>.</li>
            <li>Wir sorgen für kühle Drinks – mit & ohne Alkohol.</li>
            <li>Es ist perfekt, wenn ihr vorher etwas esst oder euch selbst etwas Kleines mitbringt.</li>
          </ul>
        </Card>

        <Card title="🎶 Stimmung & Highlights">
          <ul className="list-disc pl-6 text-slate-700 leading-relaxed">
            <li>Fotospot unter Palmen 📸</li>
            <li>Chill-Area mit Liegestühlen 🏖️</li>
            <li>Kleine Spiele & Beachvolleyball 🏐</li>
            <li>Musik mit Sommerfeeling 🎵</li>
          </ul>
        </Card>
      </div>

      {/* Deko-Welle unten */}
      <div className="mt-12">
        <svg viewBox="0 0 1440 320" className="w-full h-24 opacity-60">
          <path
            fill="url(#waveGrad)"
            fillOpacity="1"
            d="M0,160L60,149.3C120,139,240,117,360,138.7C480,160,600,224,720,245.3C840,267,960,245,1080,224C1200,203,1320,181,1380,170.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
          <defs>
            <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
