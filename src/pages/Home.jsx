import { useState } from "react";
import Countdown from "../components/Countdown.jsx";
import Card from "../components/Card.jsx";
import Lightbox from "../components/Lightbox.jsx";
import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";

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
        encodeURIComponent("Ein Abend wie Urlaub – Hochzeit Olga + Volker") +
        "&details=" +
        encodeURIComponent("Feier im BlueBeach Witten") +
        "&location=" +
        encodeURIComponent("BlueBeach Witten, Luhnsmühle 2, 58455 Witten") +
        "&dates=20260313T180000/20260314T020000";

      window.open(googleUrl, "_blank", "noopener,noreferrer");
    }
  };

  const gallery = [
    {
      alt: "BlueBeach – Außenbereich bei Abendlicht",
      src: "/assets/bb-outdoor.jpg",
    },
    { alt: "Indoorhalle im BlueBeach", src: "/assets/bb-indoor.jpg" },
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
        <section className="relative mt-4 sm:mt-6 min-h-[420px] sm:min-h-[460px] overflow-hidden rounded-3xl bg-white/70 p-[2px] shadow-[0_18px_50px_rgba(0,0,0,.18)]">
          {/* Inner-Wrapper: sorgt für sichtbaren Rand */}
          <div className="relative h-full w-full overflow-hidden rounded-[22px]">
            {/* Hintergrundbild */}
            <img
              src="/assets/hero-hammock.jpg"
              onError={(e) => {
                e.currentTarget.src = "/assets/bb-outdoor.webp";
              }}
              alt="Sonnenuntergang am Strand"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />

            {/* Farbverläufe & Glows */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />
            <div
              className="absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full blur-3xl opacity-60 pointer-events-none sm:h-[380px] sm:w-[380px]"
              style={{
                background:
                  "radial-gradient(circle,#22d3ee55,#f59e0b44 45%,transparent 60%)",
              }}
            />
            <div
              className="absolute -left-24 -top-20 h-[260px] w-[260px] rounded-full blur-3xl opacity-40 pointer-events-none sm:h-[300px] sm:w-[300px]"
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
                <b>BlueBeach Witten</b> – entspannt, elegant und barfußfreundlich.
                Kommt so, wie ihr euch wohlfühlt, und bringt einfach gute Laune
                mit.
              </p>
<div className="mt-4 max-w-[760px] rounded-2xl bg-white/15 border border-white/30 px-5 py-4
                text-white/95 text-xs sm:text-sm md:text-base backdrop-blur
                shadow-[0_8px_30px_rgba(0,0,0,.25)]">

  <div className="flex items-center justify-center gap-2 mb-2 text-sm sm:text-base font-semibold">
    🏖️ Unsere Geschichte im Sand
  </div>

  <p className="text-center leading-relaxed">
    Wir haben uns <b>beim Beachen im Sand</b> kennengelernt und wir waren schon damals in einem Team (und ja, auch damals waren wir nicht immer bei allen Sachen gleicher Meinung).  
    <br className="hidden sm:block" />
    Und genau dort geht’s bei unserer Hochzeit weiter: 
    <span className="font-semibold"> {" "}
       im Sand mit viel Herz.
    </span>
  </p>
</div>


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

                <span className="chip">🍹 Drinks und Fingerfood</span>
                <span className="chip">🏐 Beachvolleyball · wer mag</span>
                <span className="chip">💛 Dresscode: sportlich Elegant</span>
              </div>

              {/* Countdown – gläsernes Panel */}
              {/* FIX: Auf Mobile skaliert + kein Überlaufen; Desktop bleibt unverändert */}
              <div className="mt-5 sm:mt-6 glass px-5 sm:px-6 py-4 sm:py-5 rounded-2xl w-full max-w-[420px] overflow-hidden">
                <div className="text-xs sm:text-sm text-white/80 mb-1">
                 Hochzeits-Countdown bis zur unserem Abend wie Urlaub
                </div>

                {/* Wrapper verhindert "rauslaufen" auf kleinen Screens */}
                <div className="w-full flex justify-center">
                  <div className="w-full sm:w-auto sm:scale-100 scale-[0.86] origin-center">
                    <Countdown size="xl" targetDate={eventDate} />
                  </div>
                </div>
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

{/* Deadline-Hinweis – immer darunter */}
<div className="mt-4 max-w-xl mx-auto">
  <div className="rounded-3xl bg-white shadow-soft border border-sky-200 px-4 py-2 w-full">
    <div className="border-2 border-sky-300 rounded-2xl px-4 py-2 text-center text-sky-800 text-xs sm:text-sm
                    bg-gradient-to-b from-sky-50 to-white
                    shadow-[0_0_0_4px_rgba(56,189,248,0.08)]">
                       <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white border border-sky-200 text-sky-800 font-semibold mr-2">
        ⏰ Frist
      </span>
      Anmeldung bitte bis zum <b>15.01.2026</b> ⏰
    </div>
  </div>
</div>

<div className="mt-3 max-w-xl mx-auto w-full">
  <div className="rounded-3xl bg-white shadow-soft border border-sky-100 px-4 py-2 w-full">
    <div className="border-2 border-sky-200 rounded-2xl px-4 py-2 text-center text-slate-700 text-xs sm:text-sm bg-sky-50">
      🌙 Abendveranstaltung: Wir feiern ohne Kinder – bitte organisiert eine Betreuung, damit wir ordentlich feiern können!
    </div>
  </div>
</div>


              {/* Sandhochzeit-Teaser direkt unter den CTAs (breit & klickbar) */}
              <Link
                to="/sandhochzeit"
                className="group mt-4 sm:mt-5 block w-full max-w-[860px]"
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/25 bg-gradient-to-br from-[#FFF3D6] via-[#F4D9A7] to-[#EBCB8C] px-5 py-4 sm:px-6 sm:py-5 shadow-[0_18px_40px_rgba(0,0,0,.18)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,.22)]">
                  {/* Glow */}
                  <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-yellow-200/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-12 -left-12 h-52 w-52 rounded-full bg-white/25 blur-3xl" />

                  <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/30 px-3 py-1 text-[11px] font-semibold text-black/80">
                        🏝️ Beachhalle • Indoor • Sand überall
                      </div>

                      <h3 className="mt-2 text-left text-base sm:text-lg font-extrabold text-black leading-snug">
                        Hochzeit im Sand – aber ohne Meer. Dafür mit…{" "}
                        <span className="underline decoration-black/20">
                          Sand. ÜBERALL.
                        </span>{" "}
                        😄
                      </h3>

                      <p className="mt-1 text-left text-xs sm:text-sm text-black/75">
                        Tanzfläche: Sand. Theke: Sand. Schuhe: optional. Gute
                        Laune: Pflicht.
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] sm:text-xs">
                        <span className="chip">Tanzfläche: Sand</span>
                        <span className="chip">Theke: Sand</span>
                        <span className="chip">Spielwiese: Sand</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="hidden sm:inline-flex items-center rounded-2xl bg-black/80 px-4 py-2 text-sm font-semibold text-white">
                        Zur Sand-Seite →
                      </span>
                      <span className="sm:hidden inline-flex items-center justify-between w-full rounded-2xl bg-black/80 px-4 py-2 text-sm font-semibold text-white">
                        Zur Sand-Seite{" "}
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: Was dich erwartet + „Spielfeld“ des Abends */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* Was dich erwartet – Icons kompakt */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
              Was dich im BlueBeach erwartet
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mb-4">
              Stell dir eine Mischung aus <strong>Strandbar</strong>,{" "}
              <strong>Beachvolleyballcourt</strong> und{" "}
              <strong>Sommerparty</strong> vor...
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="text-2xl">🏖️</div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    Feiner Sand – echtes Urlaubsgefühl
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    Wir stehen und tanzen im Sand und wer nicht mehr kann, setzt sich in die gemütlichen Sitzgelegenheiten.
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
                    Palmen, Lichterketten und Strandambiente – perfekt für Fotos
                    und dieses „Urlaub-ohne-Flug“-Gefühl. Chill-Area mit Liegestühlen  🏖️
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
                    Drinks, entspannte Musik – wir starten locker rein und steigern
                    langsam Richtung Vollgas.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
  <div className="text-2xl">🍢</div>
  <div>
    <div className="font-semibold text-xs sm:text-sm">
      Kleine Snacks & Fingerfood – für zwischendurch
    </div>
    <p className="text-[11px] sm:text-xs text-slate-600">
      Kleine Leckereien zum Teilen und Snacken – perfekt zwischen Drinks,
      Tanzfläche und Strandfeeling. Kein großes Menü, aber genau richtig,
      um Energie zu tanken.
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
                    Lachen, tanzen, quatschen, im Sand sitzen – Hauptsache zusammen.
                    Fast alles darf, nichts muss, ausser manchmal.
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

            <div className="rounded-3xl bg-white shadow-soft border border-sky-100 p-5 md:p-6">
              <div className="relative">
                <div className="border-2 border-sky-300 rounded-2xl p-3 md:p-4">
                  <div className="border-t border-dashed border-sky-300 my-3 md:my-4 relative">
<div className="absolute left-1/2 -top-5 -translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap bg-sky-100 text-sky-800 text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-soft">
  🏐 Netz & Start des tollen Abends
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

                <div className="hidden md:flex absolute -right-3 -bottom-3 h-12 w-12 rounded-full bg-yellow-200 border-2 border-yellow-400 items-center justify-center text-2xl shadow-soft">
                  🏐
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                So in etwa wird der Abend: erst ankommen, anstoßen und orientieren –
                dann ein bisschen Action im Sand für alle, die Lust haben – und
                anschließend ganz viel Zeit für Strandstimmung, Musik und Feiern.
              </p>
            </div>
          </div>
        </section>

<section className="mt-8 max-w-3xl mx-auto">
  <div className="rounded-3xl bg-white shadow-soft border border-slate-200 px-5 py-4 text-center">
    <div className="border border-slate-200 rounded-2xl px-4 py-4 bg-slate-50">
      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        <span className="font-medium">
          Noch ein Wort zu Geschenken 💛
        </span>
        <br />
        Wir heiraten gleich zweimal (keine Sorge – <b>zweimal dieselbe Person</b> 😉):
        einmal in Georgien und einmal hier in Witten.{" "}
        <br className="hidden sm:block" />
        Unser Konto bekommt dabei gerade ordentlich Sonnenbrand 🤵☀️ –
        deshalb freuen wir uns am meisten über einen
        <span className="font-medium"> eleganten Umschlag</span>, der unsere Hochzeitsfonds
        mit ein paar Strandtalern ergänzt.
      </div>
    </div>
  </div>
</section>




        {/* Divider zwischen Hauptblöcken */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Split: Galerie links, Infos rechts */}
        <section className="mt-12 grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
          {/* Galerie */}
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
              Ein kleiner Vorgeschmack
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {gallery.map((g, i) => (
                <img
                  key={i}
                  src={g.src}
                  alt={g.alt}
                  onClick={() => setOpen(g.src)}
                  className="w-full h-[150px] md:h-[220px] object-cover rounded-3xl shadow-soft cursor-pointer hover:scale-[1.02] transition"
                />
              ))}
            </div>

            <Lightbox src={open} alt="Galerie" onClose={() => setOpen(null)} />
          </div>

          {/* Info-Kacheln */}
          <div className="space-y-4">
            <Card title="Dresscode: sportlich Elegant">
              <p className="text-xs sm:text-sm text-slate-700">
                Hochzeit und Strand ... Was trag ich nur??? Einfach was euch in
                den Kopf kommt... bequeme Schuhe für den Sand und lockeres Outfit.
                Eher „Beach Chic“ als ganz formell – Hauptsache, ihr fühlt euch
                wohl und es ist nicht das, was ihr sonst so tragt...
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-[11px] sm:text-xs">
                <span className="chip">Kleider</span>
                <span className="chip">Hemden</span>
                <span className="chip">Beachfarben</span>
                <span className="chip">
                  Sonnenhut, auch wenn die Sonne nur im Herzen scheint
                </span>
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
                <li>Danach – Beachgames, Fotos, Musik & Strandfeeling</li>
                <li>Alles Schöne hat ein Ende – ab 2 Uhr wird geschlafen 😉</li>
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

        {/* Abschluss */}
        <section className="mt-8 sm:mt-10">
          <p className="text-center text-xs sm:text-sm text-slate-600 px-1">
            Wir freuen uns riesig darauf, diesen besonderen Abend mit euch zu
            verbringen –{" "}
            <strong>im Sand, unter Palmen und mit ganz viel Herz</strong>. 💛
          </p>
        </section>
      </main>
    </div>
  );
}
