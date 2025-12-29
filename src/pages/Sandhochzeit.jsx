import React from "react";

/**
 * Unterseite: Hochzeit im Sand (Beachhalle / Indoor)
 * - Keine Meerbilder
 * - Sand-Thema überall (Tanzfläche, Theke, Schuhe, Haare…)
 * - Lustig, übertrieben, informell
 *
 * Voraussetzung: TailwindCSS (oder passe die Klassen an dein Setup an)
 */
export default function SandhochzeitUnterseite() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-[#FFF7E6] via-[#F6E6C9] to-[#EED6A8] px-6 py-10 shadow-sm md:px-10 md:py-14"
      aria-label="Hochzeit im Sand in der Beachhalle"
    >
      {/* Deko: „Sandkörner“ (rein per CSS/Divs, keine Bilder) */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-black/5 blur-3xl" />

      {/* Konfetti/Sandstaub-Punkte */}
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-black/30" />
        <div className="absolute left-[22%] top-[35%] h-1 w-1 rounded-full bg-black/20" />
        <div className="absolute left-[58%] top-[22%] h-1 w-1 rounded-full bg-black/25" />
        <div className="absolute left-[74%] top-[44%] h-1 w-1 rounded-full bg-black/20" />
        <div className="absolute left-[40%] top-[62%] h-1 w-1 rounded-full bg-black/20" />
        <div className="absolute left-[15%] top-[78%] h-1 w-1 rounded-full bg-black/25" />
        <div className="absolute left-[86%] top-[70%] h-1 w-1 rounded-full bg-black/30" />
        <div className="absolute left-[92%] top-[30%] h-1 w-1 rounded-full bg-black/20" />
        <div className="absolute left-[33%] top-[12%] h-1 w-1 rounded-full bg-black/15" />
        <div className="absolute left-[66%] top-[86%] h-1 w-1 rounded-full bg-black/15" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70">
              <span aria-hidden>🏝️</span> Beachhalle-Edition • Indoor • 100% Sand-Vibes
            </p>
           <h1 className="mt-3 font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-[#3B2F1E]">
  Hochzeit im Sand – zwar nicht am Meer...
  <span className="block mt-1 text-[#6B5A44] font-normal tracking-normal">
    ...aber definitiv MEHR, als du dir vorstellen kannst.
  </span>
</h1>
<div className="mt-3 h-[2px] w-16 rounded-full bg-[#D8C39A]" />

          </div>

          <div className="flex gap-2">
            <span className="rounded-2xl bg-white/55 px-3 py-2 text-sm text-black/70 shadow-sm ring-1 ring-black/5">
              Tanzfläche: Sand
            </span>
            <span className="rounded-2xl bg-white/55 px-3 py-2 text-sm text-black/70 shadow-sm ring-1 ring-black/5">
              Theke: Sand
            </span>
          </div>
        </div>

        {/* Intro Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Keine steifen Regeln"
            emoji="🕺"
            text="Hier wird nicht geschniegelt – hier wird gelebt."
          />
          <InfoCard
            title="Beachhalle-Feeling"
            emoji="🏖️"
            text="Strand-Atmosphäre indoor: locker, lässig – ohne Wind, aber mit Wow."
          />
          <InfoCard
            title="Sand-Deluxe"
            emoji="✨"
            text="Wenn am Ende Sand aus Taschen rieselt: Glückwunsch, du warst richtig dabei."
          />
        </div>

        {/* Main Text Block (vom User übernommen) */}
        <div className="mt-8 rounded-3xl bg-white/60 p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <h2 className="text-xl font-semibold text-black md:text-2xl">
            Warum das Ganze so unfassbar cool ist?
          </h2>

          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-black/80 md:text-base">
            <p>
              Stellt euch vor: Hochzeit. Liebe liegt in der Luft. Und Sand. Überall Sand.
              <br />
              Nicht nur so ein bisschen „oh, wie romantisch am Strand“ – nein. Richtiger Sand.
              <br />
              Auf der Tanzfläche. An der Theke. In den Schuhen. In den Haaren. Wahrscheinlich sogar im
              Drink (extra Crunch 🌴).
            </p>

            <p>
              Während andere Hochzeiten geschniegelt auf Parkett rutschen, tanzen wir barfuß oder mit leichten Schuhen durch die
              Dünen. Jeder Schritt knirscht, jede Drehung ist ein Mini-Urlaub, und spätestens nach dem
              dritten Lied ist klar: Tanzen im Sand ist anstrengend 💙.
            </p>

            <p className="font-medium text-black/85">
              An der Bar? Sand.
              <br />
              Beim Anstoßen? Sand.
              <br />
              Beim Tanzen? Sand deluxe.
            </p>

            <p>
              Aber genau das macht’s so genial:
              <br />
              Keine steifen Regeln, kein „Achtung, frisch gewischter Boden“. Hier darf gefeiert,
              gelacht, getanzt und richtig gelebt werden. Wenn am Ende des Abends Sand aus Taschen,
              Kleidern und Socken rieselt, wisst ihr: Das war keine gewöhnliche Hochzeit, sondern Olgas und Volkers Hochzeit. Das war ein
              Erlebnis.
            </p>

            <p className="text-black">
              <span className="font-semibold">Kurz gesagt:</span>
              <br />
              Liebe im Herzen, Drink & Beachvolleyball in der Hand und Sand zwischen den Zehen – cooler wird Heiraten
              einfach nicht.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-black/5 p-6 ring-1 ring-black/5">
            <h3 className="text-lg font-semibold text-black">Was euch erwartet</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-black/75">
              <li>• Tanzfläche wie am Strand – nur eben in der Beachhalle</li>
              <li>• Theke mit Sand-Upgrade (ja, wirklich überall)</li>
              <li>• Schuhe optional, gute Laune obligatorisch</li>
              <li>• Der Abend endet nicht geschniegelt – sondern legendär</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white/55 p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold text-black">Kleiner Hinweis 😄</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/75">
              Wenn du Sand später in Jackentaschen findest: Das ist kein Unfall.
              <br />
              Das ist ein Souvenir. Kostenlos. Emotional. Und absolut unvergesslich.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>Indoor Beach Vibes</Tag>
              <Tag>Barfuß-erlaubt aber kein muss</Tag>
              <Tag>Sand auf der Theke</Tag>
              <Tag>Sand auf der Tanzfläche</Tag>
            </div>
          </div>
        </div>

        {/* CTA (optional) */}
    <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-white/60 to-white/30 p-6 ring-1 ring-black/5 md:flex-row md:items-center">
  <div>
    <p className="text-sm font-medium text-black/70">Bereit für die Sandhochzeit?</p>
    <p className="mt-1 text-base font-semibold text-black">
      Komm rein und tanz dich glücklich. 💃
    </p>
  </div>

  <a
    href="/bluebeach"
    className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/90 transition"
  >
    Details zum BlueBeach →
  </a>
</div>


        {/* Anchor targets (falls du sie brauchst) */}
        <div className="sr-only">
          <div id="details" />
          <div id="kontakt" />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, emoji, text }) {
  return (
    <div className="rounded-3xl bg-white/55 p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black/5 text-lg" aria-hidden>
          {emoji}
        </div>
        <div>
          <h3 className="text-base font-semibold text-black">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-black/70">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70 ring-1 ring-black/5">
      {children}
    </span>
  );
}
