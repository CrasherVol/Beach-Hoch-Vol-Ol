// src/pages/Anmeldung.jsx
import { useState, useEffect, useRef } from "react";
import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

export default function Anmeldung() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [f, setF] = useState({
    attend: "yes", // "yes" = Zusage, "no" = Absage
    name: "",
    email: "",
    persons: 1,
    message: "",
    allergies: "",
    extraNames: [], // zusätzliche Personen
  });

  // State & Refs für den Regen-Effekt
  const [rainDrops, setRainDrops] = useState([]);
  const rainIntervalRef = useRef(null);
  const rainIdRef = useRef(0);

  // 🔊 Sad Violin Audio
  const sadAudioRef = useRef(null);

  // 🔊 Happy Song Audio
const happyAudioRef = useRef(null);


  // 💧 Happy-Regen (Zusage)
  const triggerRainHappy = () => {
    // nur bei Zusage Regen starten
    if (f.attend !== "yes") return;

    const durationMs = 8000; // wie lange neuer Regen erzeugt wird
    const intervalMs = 80; // alle wieviel ms ein neues Emoji entsteht
    const start = Date.now();

    // Falls schon ein Interval läuft, beenden
    if (rainIntervalRef.current) {
      clearInterval(rainIntervalRef.current);
      rainIntervalRef.current = null;
    }

    rainIntervalRef.current = setInterval(() => {
      const now = Date.now();
      if (now - start > durationMs) {
        clearInterval(rainIntervalRef.current);
        rainIntervalRef.current = null;
        return;
      }

      const id = rainIdRef.current++;
      const emojis = ["❤️", "❤️", "❤️", "❤️", "🏐", "🍹", "☀️"];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      const left = Math.random() * 100; // vw
      const delay = Math.random(); // 0–1s
      const size = 1.6 + Math.random() * 1.4; // 1.6–3rem
      const duration = 5 + Math.random() * 1.5; // 5–6.5s

      setRainDrops((prev) => [
        ...prev,
        { id, emoji, left, delay, size, mood: "happy", duration },
      ]);

      setTimeout(() => {
        setRainDrops((prev) => prev.filter((d) => d.id !== id));
      }, (duration + 1) * 1000);
    }, intervalMs);
  };

  // 😭 Sad-Regen (Absage)
  const triggerRainSad = () => {
    const durationMs = 10000; // wie lange der Regen erzeugt wird (länger = trauriger)
    const intervalMs = 150; // etwas weniger dicht als Happy-Rain
    const start = Date.now();

    if (rainIntervalRef.current) {
      clearInterval(rainIntervalRef.current);
      rainIntervalRef.current = null;
    }

    rainIntervalRef.current = setInterval(() => {
      const now = Date.now();
      if (now - start > durationMs) {
        clearInterval(rainIntervalRef.current);
        rainIntervalRef.current = null;
        return;
      }

      const id = rainIdRef.current++;
      const emojis = ["😢", "😭", "💔", "🌧️"];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      const left = Math.random() * 100;
      const delay = Math.random();
      const size = 1.4 + Math.random() * 1.0; // etwas kleiner als der Happy-Rain
      const duration = 8 + Math.random() * 2; // 8–10s → langsamer

      setRainDrops((prev) => [
        ...prev,
        { id, emoji, left, delay, size, mood: "sad", duration },
      ]);

      setTimeout(() => {
        setRainDrops((prev) => prev.filter((d) => d.id !== id));
      }, (duration + 1) * 1000);
    }, intervalMs);
  };

  const onChange = (e) => {
    const { name, value, type } = e.target;

    // Umschalten zwischen Zusage / Absage
    if (name === "attend") {
      const attend = value; // "yes" | "no"
      setF((v) => {
        // Wenn auf Absage gestellt → persons = 0, keine Mitgäste
        if (attend === "no") {
          return {
            ...v,
            attend,
            persons: 0,
            extraNames: [],
          };
        }
        // Wenn zurück auf Zusage und bisher 0 Personen → auf 1 setzen
        if (attend === "yes" && (v.persons || 0) === 0) {
          return {
            ...v,
            attend,
            persons: 1,
          };
        }
        return { ...v, attend };
      });
      return;
    }

    // Spezial-Handling für Personenanzahl (nur bei Zusage)
    if (name === "persons") {
      const persons = Number(value) || 1;
      // mind. 1 Person bei Zusage
      const safePersons = Math.max(1, persons);
      setF((v) => {
        const extraCount = Math.max(0, safePersons - 1);
        const extraNames = Array.from(
          { length: extraCount },
          (_, i) => v.extraNames?.[i] || ""
        );
        return {
          ...v,
          persons: safePersons,
          extraNames,
        };
      });
      return;
    }

    // Standard-Handling für alle anderen Felder
    setF((v) => ({
      ...v,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // eigener Handler für zusätzliche Namen
  const onExtraNameChange = (index, value) => {
    setF((v) => {
      const extraNames = [...(v.extraNames || [])];
      extraNames[index] = value;
      return { ...v, extraNames };
    });
  };

  useEffect(() => {
    if (sent) window.scrollTo(0, 0);
  }, [sent]);

  // Cleanup für Regen-Interval, falls Komponente unmountet
  useEffect(() => {
    return () => {
      if (rainIntervalRef.current) {
        clearInterval(rainIntervalRef.current);
      }
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      // kleine Sicherheitslogik: bei Absage = keine Personen
      const payload =
        f.attend === "no"
          ? { ...f, persons: 0, extraNames: [] }
          : { ...f };

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fehler beim Senden");
      }

// Effekte nach erfolgreichem Speichern: Regen + Musik
if (payload.attend === "yes") {
  // 🎉 Happy-Regen
  triggerRainHappy();

  // 🎶 Happy Song abspielen
  if (happyAudioRef.current) {
    try {
      happyAudioRef.current.currentTime = 0;
      happyAudioRef.current.play();
    } catch (err) {
      console.warn("Happy Song konnte nicht abgespielt werden:", err);
    }
  }

} else if (payload.attend === "no") {
  // 😭 Trauriger Regen
  triggerRainSad();

  // 🎻 Sad Violin abspielen
  if (sadAudioRef.current) {
    try {
      sadAudioRef.current.currentTime = 0;
      sadAudioRef.current.play();
    } catch (err) {
      console.warn("Sad Violin konnte nicht abgespielt werden:", err);
    }
  }
}



      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Fehler beim Senden. Bitte später nochmal versuchen 🙏");
    } finally {
      setSending(false);
    }
  };

  const hatMitgaeste = f.extraNames?.filter(Boolean).length > 0;

  return (
    <>
     {/* Audio für Sad Violin */}
<audio ref={sadAudioRef} src="/sad-violin.mp3" preload="auto" />

{/* Audio für Happy Song */}
<audio ref={happyAudioRef} src="/happysong.mp3" preload="auto" />



      {/* SEO je nach Status */}
      {sent ? (
        <SEO
          title={
            f.attend === "no" ? "Danke – Anmeldung" : "Danke – Anmeldung"
          }
        />
      ) : (
        <SEO
          title="Anmeldung"
          description="Sag uns kurz Bescheid, ob und mit wie vielen Personen du kommst."
        />
      )}

      {/* Styles für Regen + Alarmbutton */}
      <style>{`
        .rain-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          overflow: hidden;
          z-index: 9999;
        }
        .rain-emoji {
          position: absolute;
          animation-name: heartVolleyFall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        /* Sad-Regen bekommt einen blauen Glow */
        .rain-emoji-sad {
          filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.8));
        }
        @keyframes heartVolleyFall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .alarm-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          background: #dc2626; /* rot */
          color: #fff;
          font-weight: 700;
          border: 2px solid #991b1b;
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.5);
          animation: pulse 1.2s infinite;
          text-align: center;
          max-width: 100%;
          line-height: 1.3;
        }
        .alarm-button:hover {
          filter: brightness(1.05);
          transform: translateY(-1px);
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.5);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 16px 35px rgba(220, 38, 38, 0.7);
          }
        }
      `}</style>

      <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6">
        <div className="max-w-xl mx-auto">
          {sent ? (
            <Card
              title={
                f.attend === "no"
                  ? "Danke für deine Rückmeldung!"
                  : "Danke für deine Zusage!"
              }
            >
              {f.attend === "no" ? (
                <p className="text-sm sm:text-base">
                  Schade, dass du am 13.03. nicht dabei sein kannst – aber
                  danke, dass du uns Bescheid gesagt hast 🧡
                </p>
              ) : (
                <p className="text-sm sm:text-base">
                  Wir haben dich mit <b>{f.persons}</b> Person(en) vermerkt.
                  {hatMitgaeste && (
                    <>
                      <br />
                      Mit dabei: {f.extraNames.filter(Boolean).join(", ")}
                    </>
                  )}
                </p>
              )}
              <a
                href="/"
                className="mt-3 inline-block px-4 py-2 rounded-xl bg-white shadow-soft text-sm sm:text-base"
              >
                Zur Startseite
              </a>
            </Card>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center sm:text-left">
                Anmeldung
              </h2>
              <Card>
                <form onSubmit={onSubmit} className="grid gap-3 w-full">
                  {/* Zusage / Absage Auswahl */}
                  <fieldset className="grid gap-2 mb-1">
                    <legend className="text-sm font-medium">
                      Kommst du zur Beach Wedding?
                    </legend>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="attend"
                          value="yes"
                          checked={f.attend === "yes"}
                          onChange={onChange}
                        />
                        <span>Ja, ich / wir kommen 🎉</span>
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="attend"
                          value="no"
                          checked={f.attend === "no"}
                          onChange={onChange}
                        />
                        <span>Ich kann leider nicht kommen 😢</span>
                      </label>
                    </div>

                    {f.attend === "no" && (
                      <button
                        type="button"
                        className="alarm-button mt-2 text-xs sm:text-sm"
                      >
                        🚨 Achtung, du machst einen Fehler – überdenke dein
                        Handeln! 🚨
                      </button>
                    )}
                  </fieldset>

                  <label className="grid gap-1 text-sm">
                    Name
                    <input
                      required
                      name="name"
                      value={f.name}
                      onChange={onChange}
                      placeholder="Vor- und Nachname"
                      className="border rounded-xl px-3 py-2 bg-white/90"
                    />
                  </label>

                  <label className="grid gap-1 text-sm">
                    E-Mail
                    <input
                      required
                      type="email"
                      name="email"
                      value={f.email}
                      onChange={onChange}
                      placeholder="du@example.com"
                      className="border rounded-xl px-3 py-2 bg-white/90"
                    />
                  </label>

                  {/* Personen nur bei Zusage */}
                  {f.attend === "yes" && (
                    <>
                      <label className="grid gap-1 text-sm">
                        Personen
                        <input
                          required
                          type="number"
                          name="persons"
                          min={1}
                          max={12}
                          value={f.persons}
                          onChange={onChange}
                          className="border rounded-xl px-3 py-2 bg-white/90"
                        />
                      </label>

                      {/* Zusätzliche Namen, wenn mehr als 1 Person */}
                      {f.persons > 1 && (
                        <div className="grid gap-2 mt-1">
                          {Array.from({ length: f.persons - 1 }).map((_, i) => (
                            <label key={i} className="grid gap-1 text-sm">
                              Name Mitgast {i + 2}
                              <input
                                type="text"
                                value={f.extraNames?.[i] || ""}
                                onChange={(e) =>
                                  onExtraNameChange(i, e.target.value)
                                }
                                placeholder={`Name der Person ${i + 2}`}
                                className="border rounded-xl px-3 py-2 bg-white/90"
                              />
                            </label>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  <label className="grid gap-1 text-sm">
                    Trinker oder Fahrer? (optional)
                    <input
                      name="allergies"
                      value={f.allergies}
                      onChange={onChange}
                      placeholder="hoffentlich kein Fahrer 😄"
                      className="border rounded-xl px-3 py-2 bg-white/90"
                    />
                  </label>

                  <label className="grid gap-1 text-sm">
                    noch was???
                    <textarea
                      name="message"
                      rows="4"
                      value={f.message}
                      onChange={onChange}
                      placeholder="Gibt’s noch was Wichtiges, was du uns sagen willst?"
                      className="border rounded-xl px-3 py-2 bg-white/90"
                    />
                  </label>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    disabled={sending}
                    className="mt-1 px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:scale-[1.02] transition disabled:opacity-60 text-sm sm:text-base"
                  >
                    {sending
                      ? "Wird gesendet…"
                      : f.attend === "no"
                      ? "Absage senden"
                      : "Zusage senden"}
                  </button>

                  <p className="text-slate-500 text-xs sm:text-sm">
                    Datenschutz: Angaben nur zur Organisation der Feier.
                  </p>
                </form>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Regen-Overlay, läuft über der ganzen Seite (mobil & Desktop) */}
      <div className="rain-overlay">
        {rainDrops.map((drop) => (
          <span
            key={drop.id}
            className={`rain-emoji ${
              drop.mood === "sad" ? "rain-emoji-sad" : ""
            }`}
            style={{
              left: `${drop.left}vw`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration || 5}s`,
              fontSize: `${drop.size}rem`,
            }}
          >
            {drop.emoji}
          </span>
        ))}
      </div>
    </>
  );
}
