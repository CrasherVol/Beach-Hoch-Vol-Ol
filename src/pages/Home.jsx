import { useState } from 'react'
import Countdown from '../components/Countdown.jsx'
import Card from '../components/Card.jsx'
import Lightbox from '../components/Lightbox.jsx'
import SEO from '../components/SEO.jsx'

export default function Home(){
  const [open, setOpen] = useState(null)
  const date = new Intl.DateTimeFormat('de-DE', { dateStyle: 'full' })
    .format(new Date('2026-02-13T17:00:00+01:00'))

  const gallery = [
    { alt:'BlueBeach – Außenbereich bei Abendlicht', src:'/assets/bb-outdoor.webp' },
    { alt:'Indoorhalle im BlueBeach',               src:'/assets/bb-indoor.webp' },
    { alt:'Feier mit Drinks',                       src:'/assets/party-drinks.png' },
    { alt:'Feiern am Beach – edel',                 src:'/assets/party-drinks-2.png' },
  ]

  return (
    <div className="home">
      <SEO
        title="Volker ❤ Olga – Beach Wedding"
        description="Ein Abend wie Urlaub: Sonne, Sand & Liebe im BlueBeach Witten. Fingerfood, Drinks, Freunde — 13.02.2026."
      />

      {/* HERO – großes Logo + Gefühl */}
<section className="relative mt-6 overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(0,0,0,.18)]">
  {/* Hintergrundbild */}
  <img
    src="/assets/hero-hammock.jpg"
    onError={(e)=>{ e.currentTarget.src='/assets/bb-outdoor.webp' }}
    alt="Sonnenuntergang am Strand"
    className="absolute inset-0 w-full h-full object-cover"
    loading="eager"
  />

  {/* Farbverläufe & Glows */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
  <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-60 pointer-events-none"
       style={{background:'radial-gradient(circle,#22d3ee55,#f59e0b44 45%,transparent 60%)'}} />
  {/* Neue goldene Sonne */}
  <div className="absolute -left-20 -top-20 w-[300px] h-[300px] rounded-full blur-3xl opacity-40 pointer-events-none"
       style={{background:'radial-gradient(circle,#fde68a80,#fbbf2433 40%,transparent 70%)'}} />

  {/* Inhalt */}
  <div className="relative z-10 px-6 md:px-10 py-14 md:py-20 flex flex-col items-center text-center text-white">
    {/* Logo groß + Glow */}
    <img
      src="/logo.png"
      alt="Volker & Olga – Logo"
      className="w-[320px] md:w-[420px] max-w-[80vw] rounded-3xl shadow-[0_18px_60px_rgba(0,0,0,.45)] animate-logoPop"
    />

    {/* Claim */}
    <h1 className="mt-8 text-3xl md:text-5xl font-extrabold leading-tight">
      Ein Abend wie Urlaub – <span className="grad-text">im Sand mit euch</span>
    </h1>
    <p className="mt-3 max-w-[780px] text-white/90 text-lg">
      Palmen, Sand, Lichterketten: Wir feiern unsere Liebe im <b>BlueBeach Witten</b> –
      entspannt, elegant und barfußfreundlich. Kommt so, wie ihr euch wohlfühlt.
    </p>

    {/* Badges */}
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <span className="chip">📍 BlueBeach · Witten</span>
      <span className="chip">📅 {date}</span>
      <span className="chip">🍹 Fingerfood & Drinks</span>
      <span className="chip">🏐 Beachvolleyball · wer mag</span>
    </div>

    {/* Countdown – gläsernes Panel */}
    <div className="mt-6 glass px-6 py-5 rounded-2xl">
      <div className="text-sm text-white/80 mb-1">Countdown bis zum Start</div>
      <Countdown size="xl" />
    </div>

    {/* CTAs */}
    <div className="mt-6 flex flex-wrap gap-3 justify-center">
      <a href="/anmeldung" className="btn-primary">Jetzt anmelden</a>
      <a href="/anfahrt" className="btn-white">Anfahrt</a>
    </div>
  </div>
</section>


      {/* Drei Gründe – knackig in Kästchen */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Card title="Beach-Ambiente">
          <p>Feiner Sand, warme Lichter, entspannter Dresscode – elegant, aber barfuß-tauglich.</p>
        </Card>
        <Card title="Leicht & lecker">
          <p>Fingerfood & Drinks – unkompliziert genießen, vegetarische Optionen inklusive.</p>
        </Card>
        <Card title="Gemeinsam feiern">
          <p>Gute Gespräche, Musik, wer mag ein Match am Court – Hauptsache zusammen.</p>
        </Card>
      </section>

      {/* Bildstreifen – echtes Feeling */}
      <section className="mt-6">
        <div className="grid md:grid-cols-4 gap-3">
          {gallery.map((g, i) => (
            <img
              key={i}
              src={g.src}
              alt={g.alt}
              onClick={()=>setOpen(g.src)}
              className="w-full h-[220px] md:h-[240px] object-cover rounded-2xl shadow-[0_10px_26px_rgba(0,0,0,.12)] cursor-pointer hover:scale-[1.01] transition"
            />
          ))}
        </div>
        <Lightbox src={open} alt="Galerie" onClose={()=>setOpen(null)} />
      </section>

      {/* Info-Kacheln – Klar & schnell */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Card title="Dresscode: Elegant & Beachy">
          <p>Leichte Sommerstoffe, Pastell oder Naturtöne – bequem im Sand. Flache Schuhe empfohlen.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="chip">Leinen</span>
            <span className="chip">Chiffon</span>
            <span className="chip">Sand- & Koralltöne</span>
            <span className="chip">Sonnenhut optional</span>
          </div>
          <a href="/dresscode" className="inline-block mt-3 text-emerald-600 hover:text-emerald-700">Mehr zum Dresscode →</a>
        </Card>
        <Card title="Ablauf & Anfahrt">
          <ul className="list-disc pl-5">
            <li>17:00 – Eintreffen & Welcome-Drink</li>
            <li>18:15 – Fingerfood-Buffet</li>
            <li>Open End – Musik, Strand & gute Laune</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <a href="/ablauf"  className="btn-white">Ablauf</a>
            <a href="/anfahrt" className="btn-white">Anfahrt</a>
          </div>
        </Card>
      </section>
    </div>
  )
}
