import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";
import CocktailList from '../components/CocktailList.jsx'


export default function BlueBeach() {
  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6 bg-slate-50">
      <SEO
        title="BlueBeach – Feiern im Sand"
        description="Eventlocation mit Sand, Palmen und Beachvolleyball – perfekte Strandbar-Atmosphäre für unsere Feier im BlueBeach Witten."
      />

      <div className="max-w-6xl mx-auto">
        {/* HERO + STORY */}
        <section className="mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold mb-2">
            Location
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            BlueBeach Witten – Feiern wie im Urlaub
          </h1>

          {/* kleine Story-Box */}
          <div className="rounded-3xl bg-white shadow-soft border border-emerald-50 p-4 md:p-5 mb-4">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-emerald-600 font-semibold mb-1">
              Stell es dir so vor
            </p>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Stell dir vor: Du kommst rein –{" "}
              <strong>warmer Sand unter den Füßen</strong>, Palmen neben dir.
              Aus der Bar kommt Musik, die Stimmung ist entspannt, Menschen
              lachen, stoßen an. Und mittendrin unsere Gruppe –{" "}
              <strong>barfuß, lachend, wie im Urlaub</strong>. Genau dieses
              Gefühl holen wir uns mit der Feier im BlueBeach.
            </p>
          </div>

          <p className="text-slate-600 text-sm md:text-base max-w-3xl">
            Das <strong>BlueBeach in Witten</strong> ist eine
            Strand-Eventlocation mit feinem Sand, Palmen,
            Beachvolleyballfeldern und einer Strandbar. Wir haben für unsere
            Veranstaltung einen Teil des <strong>Sandbereichs exklusiv</strong>{" "}
            gemietet, sodass wir im eigenen „Privatstrand“ feiern, spielen und
            chillen können.
          </p>
        </section>

        <CocktailList />

        {/* BILDER-TEASER */}
        <section className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <figure className="relative rounded-2xl overflow-hidden shadow-soft">
              <img
                src="/assets/bb-outdoor.webp"
                alt="BlueBeach Außenbereich"
                className="w-full h-[190px] sm:h-[210px] md:h-[220px] object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-[11px] sm:text-xs px-3 py-2">
                Outdoorbereich mit Sand, Palmen & Lichterketten
              </figcaption>
            </figure>
            <figure className="relative rounded-2xl overflow-hidden shadow-soft">
              <img
                src="/assets/bb-indoor.webp"
                alt="BlueBeach Indoorhalle"
                className="w-full h-[190px] sm:h-[210px] md:h-[220px] object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-[11px] sm:text-xs px-3 py-2">
                Indoor-Strand – wetterunabhängig feiern im Sand
              </figcaption>
            </figure>
            <figure className="relative rounded-2xl overflow-hidden shadow-soft">
              <img
                src="/assets/bb-courts.jpg"
                alt="BlueBeach Beachplätze"
                className="w-full h-[190px] sm:h-[210px] md:h-[220px] object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-[11px] sm:text-xs px-3 py-2">
                Beachvolleyball & Beachgames auf mehreren Courts
              </figcaption>
            </figure>
          </div>
        </section>

        {/* WAS DICH ERWARTET – ICON-ÜBERSICHT */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
            Was dich im BlueBeach erwartet
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="flex items-start gap-3">
                <div className="text-2xl sm:text-3xl">🏖️</div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    Feiner Sand – echtes Urlaubsgefühl
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    Du stehst, spielst und feierst direkt im Sand. Schuhe aus,
                    Zehen im Sand – schon fühlt sich alles eher nach
                    Strandurlaub als nach „Eventhalle“ an.
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-3">
                <div className="text-2xl sm:text-3xl">🌴</div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    Palmen, Licht & Beach-Vibes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    Palmen, Stranddeko und Lichterketten sorgen für eine
                    gemütliche, sommerliche Atmosphäre – perfekt für Fotos,
                    Gespräche und entspanntes Zusammensitzen.
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-3">
                <div className="text-2xl sm:text-3xl">🍹</div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    Bar & Drinks – Strandfeeling + Musik
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    An der Bar bekommt ihr Drinks & Snacks. Mit Musik im
                    Hintergrund entsteht die typische Strandbar-Stimmung – erst
                    quatschen, dann feiern.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <div className="flex items-start gap-3">
                <div className="text-2xl sm:text-3xl">🏐</div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    Beachgames & Bewegung
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    Auf den Courts können wir Beachvolleyball, Spikeball, Beach
                    Soccer oder andere Fun-Games spielen – alles direkt neben
                    unserem Strandbereich.
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-3">
                <div className="text-2xl sm:text-3xl">🎉</div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    Party im Sand – zusammen feiern
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    Nach den Spielen geht es in den entspannten Partymodus über:
                    gemeinsam anstoßen, im Sand tanzen oder einfach in
                    Liegestühlen chillen und die Atmosphäre genießen.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* UNSER SETUP – KOMPLETTER SAND-BEREICH */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
            Unser Setup: Privatstrand-Feeling nur für uns
          </h2>
          <Card>
            <p className="text-sm md:text-base text-slate-700 mb-3">
              Für unsere Veranstaltung haben wir einen Teil des{" "}
              <strong>Sandbereichs exklusiv reserviert</strong>. Das heißt:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm text-slate-700 space-y-1">
              <li>
                Wir feiern die ganze Zeit <strong>direkt im Sand</strong> –
                barfuß oder in Sandalen, wie es am bequemsten ist.
              </li>
              <li>
                Eigene Beachcourts für Spiele & kleine Turniere, ohne fremde
                Gruppen.
              </li>
              <li>
                Strandlounge mit Tischen, Bänken, Liegen & Deko im Beach-Style.
              </li>
              <li>
                Genug Platz zum Sitzen, Spielen, Tanzen und einfach „Urlaub
                machen“.
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-700 mt-3">
              Im Prinzip haben wir unseren eigenen kleinen Strand – nur ohne
              Meer, aber mit allem Drumherum, was das{" "}
              <strong>Beach-Feeling</strong> ausmacht.
            </p>
          </Card>
        </section>

        {/* WAS MAN THEORETISCH ALLES MACHEN KANN */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
            Was kann man im BlueBeach grundsätzlich alles machen?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Mögliche Eventformate">
              <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm text-slate-700 space-y-1">
                <li>Firmenevents, Sommerfeste & Team-Buildings</li>
                <li>Geburtstage, JGAs & Motto-Strandpartys</li>
                <li>Beachvolleyball-Turniere & Fun-Olympiaden</li>
                <li>BBQ-Abende & After-Work-Stranddrinks</li>
                <li>Kindergeburtstage & Familien-Strandtage</li>
              </ul>
            </Card>
            <Card title="Was das Gelände bietet">
              <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm text-slate-700 space-y-1">
                <li>Indoor-Strandhalle mit feinem Sand (wetterunabhängig)</li>
                <li>Außenbereich mit Sand, Palmen & Sitzbereichen</li>
                <li>Mehrere Beachcourts für Sport & Spiele</li>
                <li>Barbereich mit Getränken & Snacks</li>
                <li>
                  Nähe zum Kemnader See für noch mehr Urlaubsfeeling
                </li>
              </ul>
            </Card>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 mt-3">
            Auch wenn das BlueBeach für viele verschiedene Formate genutzt
            werden kann – <strong>für uns steht im Mittelpunkt:</strong> im Sand
            feiern, spielen, miteinander reden, lachen und einen Abend lang
            Strandfeeling genießen.
          </p>
        </section>

        {/* FAKTEN & KONTAKT */}
        <section className="mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
            Fakten zum BlueBeach Witten
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Adresse & Lage">
              <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm text-slate-700 space-y-1">
                <li>
                  <strong>Adresse:</strong> Luhnsmühle 2, 58455 Witten
                </li>
                <li>
                  <strong>Region:</strong> Zwischen Witten, Bochum & Hagen –
                  Nähe Kemnader See
                </li>
                <li>
                  <strong>Anreise:</strong> Gut mit dem Auto erreichbar,
                  Parkmöglichkeiten vor Ort / in der Nähe
                </li>
              </ul>
            </Card>
            <Card title="Kontakt & weitere Infos">
              <ul className="list-disc pl-5 sm:pl-6 text-xs sm:text-sm text-slate-700 space-y-1">
                <li>
                  <strong>Telefon (Allgemein):</strong> 02302-580400
                </li>
                <li>
                  <strong>Telefon (Events):</strong> 02302-5804040
                </li>
                <li>
                  <strong>E-Mail:</strong> rezeption@bluebeach.de
                </li>
                <li>
                  Website:{" "}
                  <a
                    href="https://www.bluebeach.de/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 underline underline-offset-2"
                  >
                    www.bluebeach.de
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
