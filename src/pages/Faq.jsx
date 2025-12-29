import { useState } from "react";
import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

const faqs = [
  // Geschenke
  {
    question: "Was soll ich mitbringen?",
    answer:
      'Wir heiraten zweimal (Keine Angst - zweitmal die selbe Person, nur einmal in Georgien und einmal in Deutschland).. unser Konto bekommt gerade Sonnenbrand – 🤵 Daher freuen wir uns am meisten über einen eleganten Umschlag, der unsere Hochzeitsfonds mit ein paar Strandtaler ergänzt.“',
    icon: "",
    tag: "Was Schenke ich?",
  },

  // Beach & Outfit
  {
    question: "Was soll ich anziehen?",
    answer:
      'Ich sage immer: Sportlich Elegant ;-) Denkt an eine Mischung aus „schön“ und „bequem im Sand“. Gerne sommerliche. Hohe Hacken sind im Sand eher unpraktisch – flache Schuhe oder Sandalen sind perfekt. Barfuß ist auch eine Alternative, wenn die Füße nicht zu kalt werden.',
    icon: "👗",
    tag: "Outfit & Sand",
  },
  {
    question: "Gibt es einen Dresscode?",
    answer:
      'Es gibt keinen strengen Dresscode. Sportlich elegantes Auftreten. Sei Kreativ und wir schauen mal, ob wir dich reinlassen.',
    icon: "🌴",
    tag: "Outfit & Sand",
  },
  {
    question: "Kann man barfuß spielen?",
    answer:
      "Ja klar! Der Sand ist genau dafür da. Ansonsten ein paar Socken, dann bleiben die Füße wärmer, wenn ihr nicht so viel lauft...",
    icon: "🦶",
    tag: "Outfit & Sand",
  },
  {
    question: "Gibt es Umkleiden?",
    answer:
      'Es gibt vor Ort Toiletten und Bereiche, in denen ihr euch kurz umziehen oder etwas wechseln könnt. Am entspanntesten ist es trotzdem, wenn ihr schon „beach-ready“ ankommt.',
    icon: "🧺",
    tag: "Outfit & Sand",
  },

  // Beachvolleyball & Spiele
  {
    question: "Kann ich Beachvolleyball spielen, auch ohne Erfahrung?",
    answer:
      "Auf jeden Fall! Es geht nicht um Leistung, sondern um Spaß. Wer Lust hat, macht mit – alle anderen genießen das Beachfeeling mit einem Drink in der Hand und feuern an.",
    icon: "🏐",
    tag: "Beachvolleyball & Spiele",
  },
  {
    question: "Muss ich Sportsachen mitbringen?",
    answer:
      "Wenn du sicher weißt, dass du viel spielen willst, kannst du gern ein leichtes Sport-Outfit und ggf. ein zweites Shirt einpacken. Es geht aber auch locker in normaler Kleidung, solange du dich gut bewegen kannst.",
    icon: "🎽",
    tag: "Beachvolleyball & Spiele",
  },
  {
    question: "Welche anderen Spiele gibt es?",
    answer:
      "Neben Beachvolleyball wird es kleinere Spiele geben. Alles ganz locker und freiwillig – ihr entscheidet selbst, ob ihr spielt, tanzt oder einfach Hochzeit feiert.",
    icon: "🎯",
    tag: "Beachvolleyball & Spiele",
  },
 
  // Drinks & Organisation

  {
    question: "Wie lange geht die Hochzeits-Feier?",
    answer:
      "Geplant ist der Abend von 18:00 Uhr bis etwa 02:00 Uhr. Wann ihr kommt und geht, ist natürlich euch überlassen – wir freuen uns über jede gemeinsame Minute mit euch.",
    icon: "⏰",
    tag: "Drinks & Organisation",
  },
  {
    question: "Gibt es Parkplätze?",
    answer:
      "Ja, es gibt Parkmöglichkeiten in der Nähe des BlueBeach. Plant ein bisschen extra Zeit ein und bildet gern Fahrgemeinschaften, dann könnt ihr auch unsere Drinks genießen.",
    icon: "🅿️",
    tag: "Drinks & Organisation",
  },
  {
    question: "Kann ich mit öffentlichen Verkehrsmitteln kommen?",
    answer:
      "Ihr kommt mit Bahn/Bus nach Witten und von dort mit Bus oder Taxi weiter zum BlueBeach. Am besten schaut ihr vorher in eine Routen-App, was für euch am bequemsten ist.",
    icon: "🚌",
    tag: "Drinks & Organisation",
  },

  // Sonstiges
  {
    question: "Sind Kinder willkommen?",
    answer:
      "Da es sich um eine abendliche Veranstaltung mit alkoholischen Getränken handelt, bitte die Kinder bei Oma/Opa oder Kindermädchen lassen.",
    icon: "🧸",
    tag: "Sonstiges",
  },
  {
    question: "Darf ich meinen Hund mitbringen?",
    answer:
      "Nein, Hunde oder andere Haustiere sind auf der Veranstaltung nicht erwünscht.",
    icon: "🐾",
    tag: "Sonstiges",
  },
  {
    question: "Was ist, wenn das Wetter schlecht ist?",
    answer:
      "Es findet alles drinnen in der Halle statt. Wir holen das Beach/Sand Feeling in die Halle.",
    icon: "🌦️",
    tag: "Sonstiges",
  },
  {
    question: "Gibt es einen festen Programmzwang?",
    answer:
      "Es gibt ein paar Eckpunkte (Begrüßung, Fotos, vielleicht kleine Aktionen), aber der Abend soll sich frei und leicht anfühlen. Ihr dürft fast alles...",
    icon: "✨",
    tag: "Sonstiges",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6">
      <SEO
        title="FAQ"
        description="Antworten auf die häufigsten Fragen rund um unsere Beach-Hochzeit im Sand – Outfit, Beachvolleyball, Bar & Organisation."
      />

      {/* Hero / Intro */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-center grad-text px-2">
        🏐 FAQ – Beach, Bar & Beachvolleyball
      </h1>

      <p className="text-center text-slate-600 mb-6 sm:mb-8 max-w-[720px] mx-auto text-sm sm:text-base px-2">
        Hier findet ihr alles, was man für einen Abend im Sand wissen möchte:
        Outfit, Volleyball, Drinks, Anreise & mehr. Wenn danach noch Fragen
        offen sind, meldet euch einfach bei uns – wir beißen nicht, höchstens in
        eine Limette im Drink. 😉
      </p>

      {/* Kleine „Beach Highlights“-Zeile */}
      <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
        <Card>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-2">
              🏖️ Feiner Sand & Palmen
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 flex items-center gap-2">
              🏐 Beachvolleyball & Spiele
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 flex items-center gap-2">
              🍹 Bar mit Drinks
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 flex items-center gap-2">
              🎵 Musik & Urlaubsfeeling
            </span>
          </div>
        </Card>
      </div>

      {/* FAQ im Grid: 1 Spalte mobil, 2 ab md */}
      <div className="max-w-5xl mx-auto grid gap-3 sm:gap-4 md:grid-cols-2">
        {faqs.map((item, idx) => (
          <Card key={idx} className="h-full">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-start justify-between text-left gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg sm:text-xl">{item.icon}</span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    {item.tag}
                  </span>
                </div>
                <span className="font-semibold text-slate-800 text-sm sm:text-base">
                  {item.question}
                </span>
              </div>
              <span className="text-lg sm:text-xl leading-none mt-1 sm:mt-0">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>

            {openIndex === idx && (
              <p className="mt-3 text-slate-700 leading-relaxed text-sm sm:text-base">
                {item.answer}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
