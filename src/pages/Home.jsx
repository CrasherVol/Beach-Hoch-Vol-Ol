import { useState } from "react";
import Countdown from "../components/Countdown.jsx";
import Card from "../components/Card.jsx";
import Lightbox from "../components/Lightbox.jsx";
import SEO from "../components/SEO.jsx";

export default function Home() {
  const [open, setOpen] = useState(null);

  // Event-Datum: 13.03.2026, 18:00 Uhr
  const eventDate = new Date("2026-03-13T18:00:00+01:00");
  const date = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
  }).format(eventDate);

  // Kalender-Button (öffnet je nach Gerät Apple/ICS oder Google Kalender)
  const handleCalendarClick = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isApple = /iPhone|iPad|iPod|Macintosh/.test(ua);

    if (isApple) {
      // Apple / andere Kalender-Apps → ICS-Datei (muss in /public liegen)
      window.location.href = "/bluebeach-event.ics";
    } else {
      // Google Kalender (13.03.2026 18:00 bis 14.03.2026 02:00)
      const googleUrl =
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        "&text=" +
        encodeURIComponent(
          "Ein Abend wie Urlaub – Hochzeit Olga + Volker"
        ) +
        "&details=" +
        encodeURIComponent("Feier im BlueBeach Witten") +
        "&location=" +
        encodeURIComponent(
          "BlueBeach Witten, Luhnsmühle 2, 58455 Witten"
        ) +
        "&dates=20260313T180000/20260314T020000";

      window.open(googleUrl, "_blank", "noopener,noreferrer");
    }
  };

  const gallery = [
    {
      alt: "BlueBeach – Außenbereich bei Abendlicht",
      src: "/assets/bb-outdoor.webp",
    },
    { alt: "Indoorhalle im BlueBeach", src: "/assets/bb-indoor.webp" },
    { alt: "Feier mit Drinks", src: "/assets/party-drinks.png" },
    { alt: "Feiern am Beach – edel", src: "/assets/party-drinks-2.png" },
  ];

  return (
    <div className="home bg-slate-50 min-h-screen">
      <SEO
        title="Volker ❤ Olga – Beach Wedding"
        description="Ein Abend wie Urlaub: Sonne, Sand & Liebe im BlueBeach Witten. Drinks, Freunde — 13.03.2026."
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 pb-12">
        {/* HERO – großes Logo + Gefühl */}
        <section className="relative mt-4 sm:mt-6 overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(0,0,0,.18)] min-h-[420px] sm:min-h-[460px]">
          {/* Hintergrundbild */}
          <img
            src="/assets/hero-hammock.jpg"
            onError={(e) => {
              e.currentTarget.src = "/assets/bb-outdoor.webp";
            }}
            alt="Sonnenuntergang am Strand"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />

          {/* Farbverläufe & Glows */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />
          <div
            className="absolute -right-24 -top-24 w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full blur-3xl opacity-60 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,#22d3ee55,#f59e0b44 45%,transparent 60%)",
            }}
          />
          <div
            className="absolute -left-24 -top-20 w-[260px] sm:w-[300px] h-[260px] sm:h-[300px] rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,#fde68a80,#fbbf2433 40%,transparent 70%)",
            }}
          />

          {/* Inhalt */}
          <div className="relative z-10 px-5 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20 flex flex-col items-center text-center text-white">
            {/* Logo groß + Glow */}
            <img
              src="/logo.png"
              alt="Volker & Olga – Logo"
              className="w-[260px] sm:w-[320px] md:w-[420px] max-w-[80vw] rounded-3xl shadow-[0_18px_60px_rgba(0,0,0,.45)] animate-logoPop bg-white/5"
            />

            {/* Claim */}
            <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug md:leading-tight max-w-[780px]">
              Ein Abend wie Urlaub –{" "}
              <span className="grad-text">im Sand mit euch</span>
            </h1>
            <p className="mt-3 max-w-[760px] text-white/90 text-sm sm:text-base md:text-lg">
              Palmen, Sand, Lichterketten: Wir feiern unsere Liebe im{" "}
              <b>BlueBeach Witten</b> – entspannt, elegant und
              barfußfreundlich. Kommt so, wie ihr euch wohlfühlt, und bringt
              einfach gute Laune mit.
            </p>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="chip">📍 BlueBeach · Witten</span>

              {/* Datum-Button mit Kalenderfunktion */}
              <button
                type="button"
                className="chip"
                onClick={handleCalendarClick}
              >
                📅 {date}
              </button>

              <span className="chip">🍹 Drinks</span>
              <span className="chip">🏐 Beachvolleyball · wer mag</span>
              <span className="chip">💛 Dresscode: sportlich Elegant</span>
            </div>

            {/* Countdown – gläsernes Panel */}
            <div className="mt-5 sm:mt-6 glass px-5 sm:px-6 py-4 sm:py-5 rounded-2xl w-full max-w-[420px]">
              <div className="text-xs sm:text-sm text-white/80 mb-1">
                Countdown bis zu unserem Abend wie Urlaub
              </div>
              <Countdown size="xl" targetDate={eventDate} />
            </div>

            {/* CTAs */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-3 justify-center">
              <a href="/anmeldung" className="btn-primary">
                Jetzt anmelden
              </a>
              <a href="/anfahrt" className="btn-white">
                Anfahrt & Infos
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: Was dich erwartet + „Spielfeld“ des Abends */}
        <section className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[1.4fr,1.6fr] items-stretch">
          {/* Was dich erwartet – Icons kompakt */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
              Was dich im BlueBeach erwartet
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mb-4">
              Stell dir eine Mischung aus <strong>Strandbar</strong>,{" "}
              <strong>Beachvolleyballcourt</strong> und{" "}
              <strong>Sommerparty</strong> vor – ohne Flug, aber mit ganz
              viel Sand.
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="text-2xl">🏖️</div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    Feiner Sand – echtes Urlaubsgefühl
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    Wir stehen, sitzen und tanzen im Sand. Barfuß ist
                    ausdrücklich erlaubt aber kein Muss.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl">🌴</div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    Palmen & Deko – Beach-Vibes
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    Palmen, Lichterketten und Strandambiente – perfekt für
                    Fotos und dieses „Urlaub-ohne-Flug“-Gefühl.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl">🍹</div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    Bar & Drinks – Strandfeeling + Musik
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    Drinks, entspannte Musik – wir starten
                    locker rein und steigern langsam Richtung Vollgas.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    Party im Sand – zusammen feiern
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    Lachen, tanzen, quatschen, im Sand sitzen – Hauptsache
                    zusammen. Fast alles darf, nichts muss, ausser manchmal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* „Spielfeld des Abends“ – Beachvolleyball-mäßig */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
              Unser „Spielfeld“ des Abends 🏐
            </h3>
            <div className="rounded-3xl bg-white shadow-soft border border-sky-100 p-4 md:p-5">
              {/* Court-Rahmen */}
              <div className="relative">
                <div className="border-2 border-sky-300 rounded-2xl p-3 md:p-4">
                  {/* Netz-Linie */}
                  <div className="border-t border-dashed border-sky-300 my-3 md:my-4 relative">
                    <div className="absolute left-1/2 -top-5 -translate-x-1/2 bg-sky-100 text-sky-800 text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-soft flex items-center gap-1">
                      🏐 Netz & Mitte des Abends
                    </div>
                  </div>

                  <div className="grid grid-rows-3 gap-3 text-[11px] sm:text-xs md:text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-700">
                        Warm-up & Ankommen
                      </span>
                      <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-[11px]">
                        Empfang & erste Drinks
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-700">
                        Beachgames & gemeinsame Zeit
                      </span>
                      <span className="px-2 py-1 rounded-full bg-sky-50 text-sky-700 text-[10px] sm:text-[11px]">
                        wer will, spielt mit
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-700">
                        Strandparty & Chillen
                      </span>
                      <span className="px-2 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] sm:text-[11px]">
                        Musik, Gespräche, Sand
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ball in der Ecke */}
                <div className="hidden md:flex absolute -right-3 -bottom-3 h-12 w-12 rounded-full bg-yellow-200 border-2 border-yellow-400 items-center justify-center text-2xl shadow-soft">
                  🏐
                </div>
              </div>

              <p className="mt-4 text-[11px] sm:text-xs md:text-sm text-slate-600">
                So in etwa wird der Abend: erst ankommen, anstoßen und
                orientieren – dann ein bisschen Action im Sand für alle, die
                Lust haben – und anschließend ganz viel Zeit für
                Strandstimmung, Musik und Feiern.
              </p>
            </div>
          </div>
        </section>

        {/* Split: Galerie links, Infos rechts */}
        <section className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-3">
          {/* Galerie (2/3) */}
          <div className="lg:col-span-2">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
              Ein kleiner Vorgeschmack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <img
                  key={i}
                  src={g.src}
                  alt={g.alt}
                  onClick={() => setOpen(g.src)}
                  className="w-full h-[150px] sm:h-[180px] md:h-[220px] object-cover rounded-2xl shadow-[0_10px_26px_rgba(0,0,0,.12)] cursor-pointer hover:scale-[1.01] transition"
                />
              ))}
            </div>
            <Lightbox
              src={open}
              alt="Galerie"
              onClose={() => setOpen(null)}
            />
          </div>

          {/* Info-Kacheln (1/3) */}
          <div className="space-y-4">
            <Card title="Dresscode: sportlich Elegant">
              <p className="text-xs sm:text-sm text-slate-700">
                Hochzeit und Strand ... Was trag ich nur??? Einfach was euch in den Kopf kommt... bequeme Schuhe
                für den Sand und lockeres Outfit. Eher „Beach Chic“ als ganz formell – Hauptsache,
                ihr fühlt euch wohl und es ist nicht das was ihr sonst so tragt...
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] sm:text-xs">
                <span className="chip">Kleider</span>
                <span className="chip">Hemden</span>
                <span className="chip">Beachfarben</span>
                <span className="chip">Sonnenhut, auch wenn die Sonne nur im Herzen scheint</span>
              </div>
              <a
                href="/dresscode"
                className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm"
              >
                Mehr zum Dresscode →
              </a>
            </Card>

            <Card title="Ablauf & Anfahrt">
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-1">
                <li>18:00 – Ankommen & Welcome-Drink im Sand</li>
                <li>19:00 – Ein paar Worte & kleiner offizieller Teil</li>
                <li>
                  Danach – Beachgames, Fotos, Musik & Strandfeeling
                </li>
                <li>
                  Alles schöne hat ein Ende und diesmal gehts ab 2 Uhr ins Bett 😉
                </li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="/ablauf" className="btn-white text-xs sm:text-sm">
                  Ablauf ansehen
                </a>
                <a href="/anfahrt" className="btn-white text-xs sm:text-sm">
                  Anfahrt & Parken
                </a>
              </div>
            </Card>
          </div>
        </section>

        {/* Kleiner Abschluss */}
        <section className="mt-8 sm:mt-10">
          <p className="text-center text-xs sm:text-sm text-slate-600 px-1">
            Wir freuen uns riesig darauf, diesen besonderen Abend mit euch
            zu verbringen –{" "}
            <strong>
              im Sand, unter Palmen und mit ganz viel Herz
            </strong>
            . 💛
          </p>
        </section>
      </main>
    </div>
  );
}
