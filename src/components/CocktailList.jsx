const cocktails = [
  { name: "Swimming Pool", emoji: "🏊‍♂️🍹", desc: "Cremig-fruchtiger Klassiker mit Urlaubsfeeling pur." },
  { name: "Sex on the Beach", emoji: "🏖️🍑", desc: "Fruchtig, süß & absoluter Strandklassiker." },
  { name: "Mojito", emoji: "🌿🍋", desc: "Frische Minze, Limette & Eis – perfekt im Sand." },
  { name: "Vodka Orange", emoji: "🍊", desc: "Absolut Vodka | Vaihinger Orange" },
  { name: "Vodka Energy", emoji: "⚡", desc: "Absolut Vodka | Effect Energy" },
  { name: "Jägermeister Energy", emoji: "🦌⚡", desc: "Jägermeister | Energy" },
  { name: "Cuba Libre", emoji: "🇨🇺🥃", desc: "Havana Club 3 Años | Coca-Cola" },
  { name: "Likör 43 mit Milch", emoji: "🥛✨", desc: "Cremig & süß – der Klassiker" },
  { name: "Campari Orange", emoji: "🍊🍷", desc: "Herb & fruchtig" },
  { name: "Aperol Spritz", emoji: "🧡🥂", desc: "Sommerlich, leicht & prickelnd" },
  { name: "Lillet Wildberry", emoji: "🍓🥂", desc: "Fruchtig & elegant" },
  { name: "Whiskey Cola", emoji: "🥃", desc: "Jim Beam | Coca-Cola" },
  { name: "Gin Tonic", emoji: "🍸", desc: "Bombay Sapphire | Thomas Henry" }
];

export default function CocktailList() {
  return (
    <section className="mt-10 mb-12">
      <div className="inline-flex items-center gap-2 chip">
        <span role="img" aria-hidden="true">🍸</span>
        <span>Cocktailkarte am Strand</span>
      </div>

<h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold grad-text tracking-tight">
  Drinks, die nach Strandurlaub schmecken
</h2>

<p className="mt-2 text-center text-sm md:text-base text-slate-700/80 max-w-xl mx-auto">
   Wir sorgen für kühle Drinks – mit & ohne Alkohol: Bier, Wein, Longdrinks, Softdrinks & Wasser, Cocktails, Shots und alles was die Seele an Drinks begehrt. Wir haben reichlich aufgefahren und jeder sollte was Leckeres zu trinken finden...
</p>

<p className="mt-3 text-center text-sm md:text-base font-semibold text-emerald-700">
  Hier eine kleine Auswahl, die eure Vorfreude höher schlagen lässt ✨
</p>

<p className="mt-1 text-center text-xs md:text-sm text-slate-600">
  Damit ihr nicht in Versuchung geratet, lasst euer Auto besser zu Hause 🚗😉
</p>




      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cocktails.map((c) => (
          <div key={c.name} className="idea-card hover:tilt-slight">
            <div className="text-3xl md:text-4xl">{c.emoji}</div>
            <div>
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-sm text-slate-700/90 mt-1">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Die genaue Karte vor Ort kann leicht variieren – aber der Beach-Vibe bleibt gleich. 🌴
      </p>
    </section>
  );
}
