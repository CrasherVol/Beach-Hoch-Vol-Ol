import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

export default function Ablauf() {
  // 👉 Datum auf 13.03. & Startzeit 18:00
  const dateStr = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
  }).format(new Date("2026-03-13T18:00:00+01:00"));

  // 👉 Ablauf: klar nach Uhrzeiten sortiert, mit einem durchgehenden "Vibe"-Slot
  const timeline = [
    {
      time: "18:00",
      timeLabel: "ab 18:00",
      title: "Ankommen, Welcome-Drink & erstes Anstoßen",
      icon: "🍹",
      color: "from-emerald-400 to-cyan-400",
    },
    {
      time: "19:00",
      timeLabel: "ca. 19:00",
      title: "Begrüßung von Volker & Olga – ein paar Worte & Cheers",
      icon: "💍",
      color: "from-orange-400 to-pink-400",
    },

    {
      time: "19:30",
      timeLabel: "ca. 19:30",
      title: "Fotos, Beachvolleyball & Feiern – wer mag, spielt im Sand. Hier habt ihr die Möglichkeit das Brautpaar einzeln oder als perfektes Team zu schlagen -  also nicht wörtlich ;-) und erhofft euch nicht allzuviele Chancen",
      icon: "🏐",
      color: "from-cyan-400 to-sky-400",
    },
    {
      time: "22:00–02:00",
      timeLabel: "22:00 – 02:00",
      title: "Wenn ihr fertig seit mit dem anstrengenden Teil des Abends, ab geht die Hochzeitsparty",
      icon: "🏖️",
      color: "from-sky-400 to-emerald-400",
    },
    {
      time: "02:00",
      timeLabel: "gegen 02:00",
      title: "Alles Schöne hat ein Ende",
      icon: "🔥",
      color: "from-amber-500 to-red-400",
    },
  ];

  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6">
      <SEO
        title="Ablauf"
        description="Zeitplan für unseren Abend im BlueBeach – locker, beachy & ohne Essensprogramm, dafür mit viel Zeit für euch."
      />

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center grad-text px-2">
          🌴 Ablauf – {dateStr} 🌅
        </h2>

        <p className="text-center text-slate-600 mb-6 max-w-[640px] mx-auto text-sm sm:text-base px-2">
          Der Abend soll sich anfühlen wie ein Urlaubstag mit Freunden – ohne
          Stress, dafür mit{" "}
          <span className="font-semibold">Sonne im Herzen</span>, Lachen &
          Musik.
          <br />

        </p>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto mt-6 sm:mt-8">
          {/* zentrale Linie nur ab md richtig sichtbar */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 via-cyan-300 to-orange-300 rounded-full opacity-40" />
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-8 md:mb-10 ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Icon Bubble */}
              <div
                className={`relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl text-white rounded-full shadow-lg bg-gradient-to-tr ${item.color} hover:scale-110 transition`}
              >
                {item.icon}
              </div>

              {/* Verbindungslinie (nur Desktop, damit Mobile clean bleibt) */}
              <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />

              {/* Card */}
              <Card>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-xs sm:text-sm uppercase tracking-wide text-slate-500">
                    {item.timeLabel}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-1 text-slate-800">
                    {item.title}
                  </h3>
                </div>
              </Card>
            </div>
          ))}
        </div>

       

        {/* Deko-Welle unten */}
        <div className="mt-10 sm:mt-12">
          <svg viewBox="0 0 1440 320" className="w-full h-20 sm:h-24 opacity-60">
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
    </div>
  );
}
