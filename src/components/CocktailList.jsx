const cocktails = [
  {
    name: 'Beach Breeze',
    emoji: '🍹',
    desc: 'Fruchtig-frischer Signature-Drink für unseren Tag im Sand.',
    note: 'Mit und ohne Alkohol möglich.'
  },
  {
    name: 'Sunny Hugo',
    emoji: '🥂',
    desc: 'Leichter Spritz mit Holunder, Minze & einem Hauch Strandgefühl.',
    note: 'Perfekt für den Empfang.'
  },
  {
    name: 'Tropical Mocktail',
    emoji: '🍍',
    desc: 'Ananas, Maracuja & Limette – komplett alkoholfrei, aber 100% Beach.',
    note: 'Ideal für Fahrer:innen & Kids.'
  },
  {
    name: 'BlueBeach Spritz',
    emoji: '💙',
    desc: 'Unser BlueBeach-Drink in Hochzeitsedition.',
    note: 'Nur vor Ort erhältlich 😉'
  }
];

export default function CocktailList() {
  return (
    <section className="mt-10 mb-12">
      <div className="inline-flex items-center gap-2 chip">
        <span role="img" aria-hidden="true">🍸</span>
        <span>Cocktailkarte am Strand</span>
      </div>

      <h2 className="mt-4 text-2xl md:text-3xl font-semibold grad-text">
        Drinks, die nach Strandurlaub schmecken
      </h2>

      <p className="mt-2 text-sm md:text-base text-slate-700/80 max-w-xl">
        An der Beachbar bekommt ihr eine kleine Auswahl an sommerlichen Drinks.
        Mit und ohne Alkohol – Hauptsache good vibes.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cocktails.map((c) => (
          <div
            key={c.name}
            className="idea-card hover:tilt-slight"
          >
            <div className="text-3xl md:text-4xl">
              {c.emoji}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {c.name}
              </h3>
              <p className="text-sm text-slate-700/90 mt-1">
                {c.desc}
              </p>
              <p className="text-xs text-emerald-700/80 mt-2">
                {c.note}
              </p>
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
