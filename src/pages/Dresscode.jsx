const MOOD_IMAGES = [
  "/Stil-1.jpg",
  "/Stil-2.jpg",
  "/Stil-3.jpg",
  "/Stil-4.jpg",
  "/Stil-5.png",
  "/Stil-6.jpeg",
  "/Stil-7.jpeg",
  "/Stil-8.jpeg",
  "/Stil-9.jpg",
  "/Stil-10.jpg",
  "/Stil-11.jpeg",
  "/Stil-12.jpg",
  "/Stil-13.jpeg",
  "/Stil-14.jpg",
  "/Stil-15.jpg",
  "/Stil-16.png",
];


import { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

const SWATCHES = [
  { name: "Sand", hex: "#f4e7c6" },
  { name: "Koralle", hex: "#fb7185" },
  { name: "Türkis", hex: "#38bdf8" },
  { name: "See", hex: "#60a5fa" },
  { name: "Weiß", hex: "#ffffff" },
    { name: "alles ist erlaubt", hex: "#120101ff" },
];

const MOOD = [
  { alt: "Hängematte & Sunset", src: "/assets/hero-hammock.jpg" },
  { alt: "Feiern mit Drinks", src: "/assets/party-drinks.png" },
  { alt: "BlueBeach außen", src: "/assets/bb-outdoor.webp" },
  { alt: "Beach-Details", src: "/assets/beach-details.jpg" },
];

const IDEAS_SHE = [
  {
    title: "Leichtes Sommerkleid (oder Zweiteiler)",
    note: "Leinen/Chiffon, Midi/Maxi – elegant, aber tanz- & sandtauglich",
    icon: "👗",
  },
  {
    title: "Sand-geeignete Schuhe",
    note: "flach oder Keil – Absatz im Sand ist ein Abenteuer (muss man wollen)",
    icon: "🩴",
  },
  {
    title: "Schmuck: „Urlaub trifft Hochzeit“",
    note: "Perlen/Gold, Muschel-Details, Tuch, Statement-Ohrringe",
    icon: "💍",
  },
];

const IDEAS_HE = [
  {
    title: "Leinenhemd / lockeres Hemd",
    note: "gern leicht gekrempelt, aber sauber",
    icon: "👔",
  },
  {
    title: "Chino/Leinenhose (Shorts: ja, wenn’s edel bleibt)",
    note: "bitte „Sommerparty“, nicht „Supermarkt“",
    icon: "🩳",
  },
  {
    title: "Loafer/Sneaker (sandfreundlich)",
    note: "sauber, schlicht",
    icon: "👟",
  },
];

const IDEAS_UNI = [
  
];

const DO_LIST = [
"Wechselkleidung erlaubt -  erst zocken dann mit kühlen Drinks erfrischen", "Oder einfach Kleidung die für alles geeignet ist..."
];

const DONT_LIST = [
  "Sehr hohe, spitze Absätze (im Sand wirklich unpraktisch)",
  "Zu sportlich: Jogginghose, Trikots o. Ä. – das ist eher Training als Trauung",
  "Super-empfindliche Stoffe, die bei Sand/Drinks nacher mimimi verursachen...",
];

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

export default function Dresscode() {
  const [tab, setTab] = useState("he");

  const ideaList = useMemo(
    () => (tab === "she" ? IDEAS_SHE : tab === "he" ? IDEAS_HE : IDEAS_UNI),
    [tab]
  );

  const tagline = useMemo(() => {
    if (tab === "she") return "Elegant, luftig, tanzbar – und sandtauglich.";
    if (tab === "he") return "Hemd ja. Anzugpflicht nein. Sand kann was ab.";
    return "Sportlich elegant: bequem genug für Sand, edel genug für Hochzeit.";
  }, [tab]);

  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6 bg-slate-50">
      <SEO
        title="Dresscode – Sportlich elegant (Beach Wedding)"
        description="Sportlich elegant im Sand: Farben, Moodboard, Do/Don't und kreative Outfitideen für eine Hochzeit mit Beachfeeling."
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
              Sportlich elegant –{" "}
              <span className="grad-text">Hawaii trifft Hochzeit</span>
            </h2>

            <p className="mt-2 text-slate-700 max-w-[920px] text-sm md:text-base">
              Ja, wir feiern <strong>im Sand des BlueBeach</strong>. Ja, es ist{" "}
              <strong>eine Hochzeit</strong>. Und ja: Man fragt sich sofort
              „Was zieh ich bloß an?“
              <br />
              Die Antwort ist: <strong>sportlich Elegant</strong> mit einem Hauch{" "}
              <strong>Hochzeit</strong> –{" "}
              <strong>bequem genug zum Beachen</strong>,{" "}
              <strong>edel genug zum Feiern</strong>. Wer mag, darf gern ein
              bisschen <strong>Hawaii</strong> reinmogeln. Kein Kostümzwang –
              aber ein kleines bisschen „ich hab mir Gedanken gemacht“ wäre
              großartig.
            </p>

            {/* Motto / Punchlines */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>🏝️ Motto: sportlich elegant</Badge>
              <Badge>🩴 Sandtauglich statt Absatzdrama</Badge>
              <Badge>🍹 Party-ready</Badge>
              <Badge>🌺 Ein Hauch Hawaii</Badge>
              <Badge>💍 Hochzeit – aber mit Urlaubsmodus</Badge>
            </div>

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

            {/* Kurz & Knackig */}
            <div className="mt-4 grid gap-3 md:grid-cols-3 text-xs md:text-sm">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="font-semibold text-emerald-800 mb-1">
                  Kurz & knackig
                </div>
                <p className="text-emerald-900">
                  <strong>Sommerlich schick</strong>, sandtauglich, gern farbig.
                  Eher „Beach-Party“ als „Anzugpflicht“.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="font-semibold text-sky-800 mb-1">Faustregel</div>
                <p className="text-sky-900">
                  <strong>Bequem + gepflegt</strong>: Du kannst damit am Strand
                  sitzen und später entspannt feiern.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="font-semibold text-rose-800 mb-1">
                  Wichtigste Regel
                </div>
                <p className="text-rose-900">
                  Ihr sollt euch wohlfühlen – lieber{" "}
                  <strong>beachy & smart</strong> als verkleidet oder
                  verkrampft.
                </p>
              </div>
            </div>

            {/* Mini-Guide als Mehrwert */}
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Pill title="Wenn du unsicher bist">
                freundliche Farben + luftiges Oberteil + bequeme Schuhe. Damit bist du
                fast immer „richtig“.
              </Pill>
              <Pill title="Wenn du kreativ sein willst">
                Hawaii-Detail (Blüte, Muster, Tuch -  aber nicht zu viel Hawaii - wir sind ja nicht auf Hawaii) + elegantes Basic. So wirkt’s
                gewollt, nicht verkleidet.
              </Pill>
              <Pill title="Wenn du maximal clever sein willst">
                Layer dabei: Leinenblazer/Kimono/Strick. Tagsüber Beach, später
                Hochzeit.
              </Pill>
            </div>
          </div>
        </section>

        {/* Moodboard */}
        <section className="mt-8">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Moodboard – Outfit-Inspiration
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mb-3">
            Strand, Sommer, Beach-Party – aber mit einem kleinen „Hochzeit“-Twist.
            Such dir einfach Elemente raus: Farbe, Stoff, Accessoire. Der Rest
            ergibt sich.
          </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
  {MOOD_IMAGES.map((src, i) => (
    <img
      key={i}
      src={src}
      alt={`Beach Wedding Stil ${i + 1}`}
      onError={(e) => {
        e.currentTarget.src = "/assets/sunset-palm.jpg";
      }}
      className="w-full h-[190px] sm:h-[210px] md:h-[230px] object-cover object-top rounded-2xl shadow-soft hover:scale-[1.03] hover:rotate-[0.5deg] transition-transform duration-300 cursor-pointer"
    />
  ))}
</div>

        </section>

        {/* Tabs */}
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
      
                onClick={() => setTab("he")}
                className={`tab ${tab === "he" ? "tab-active" : ""}`}
              >
                Für Ihn
              </button>
            </div>
            <p className="text-[11px] text-slate-500">{tagline}</p>
          </div>

          <div className="grid gap-3 md:gap-4 md:grid-cols-3 mt-4">
            {ideaList.map((it, i) => (
              <div
                key={i}
                className="idea-card flex gap-3 p-3 rounded-2xl bg-white shadow-soft border border-slate-100"
              >
                <div className="text-2xl sm:text-3xl shrink-0">{it.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">
                    {it.title}
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm">{it.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kreativ-Kombis */}
        <section className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="3-Teile-Formel (funktioniert immer)">
              <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-xs sm:text-sm text-slate-700">
                <li>
                  <strong>1 elegantes Teil</strong> (Hemd, Blazer, Kleid, Rock)
                </li>
                <li>
                  <strong>1 bequemes Teil</strong> (Leinenhose, sandtaugliche Schuhe)
                </li>
                <li>
                  <strong>1 Hawaii/Beach-Detail</strong> (Farbe, Blüte, Tuch, Muster)
                </li>
              </ul>
              <p className="mt-2 text-[11px] sm:text-xs text-slate-500">
                Ergebnis: beachy, aber „Hochzeit-geeignet“ – ohne verkleidet zu wirken.
              </p>
            </Card>

            <Card title="Wenn du gerne spielst">
              <p className="text-xs sm:text-sm text-slate-700">
                Es gibt Sand. Es gibt Drinks. Es gibt Beachgames.
                Deshalb: <strong>beweglich</strong>, <strong>atmungsaktiv</strong>,{" "}
                <strong>tanzbar</strong>. Du sollst feiern – nicht leiden.
              </p>
              
            </Card>

            <Card title="Wenn du noch zweifelst">
              <p className="text-xs sm:text-sm text-slate-700">
                Stell dir vor: <strong>Sommerparty am Strand</strong> – nur dass
                jemand heiratet. Also: <strong>ein Tick schicker</strong> als Alltag,
                aber <strong>weit weg</strong> von „Ballkleid/Anzugpflicht“.
              </p>
              <p className="mt-2 text-[11px] sm:text-xs text-slate-500">
                Und ja: Barfuß ist erlaubt. Schuhe sind aber genauso okay, denn für manche ist der Sand kühler als gedacht auf die Dauer.
              </p>
            </Card>
          </div>
        </section>

        {/* Do / Don't */}
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <Card title="Do ✅">
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-xs sm:text-sm text-slate-700">
              {DO_LIST.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </Card>
          <Card title="Don't ❌">
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-xs sm:text-sm text-slate-700">
              {DONT_LIST.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Abschluss */}
        <section className="mt-8">
          <Card title="Kurz gesagt: Wir wollen euch genauso sehen, wie ihr seid – nur in Beach-Edition.">
            <p className="text-xs sm:text-sm text-slate-700">
              Kommt bequem, kommt schick, kommt farbig – und wenn ihr beim Outfit
              kurz grinst, weil es „Beachvolleyball trifft Hochzeit“ ist, dann seid ihr
              genau richtig.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
