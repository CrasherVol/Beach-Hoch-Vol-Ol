// src/pages/Anmeldung.jsx
import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

export default function Anmeldung() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [f, setF] = useState({
    name: "",
    email: "",
    persons: 1,
    message: "",
    allergies: "",
    extraNames: [], // 👈 zusätzliche Personen
  });

  const onChange = (e) => {
    const { name, value, type } = e.target;

    // Spezial-Handling für Personenanzahl
    if (name === "persons") {
      const persons = Number(value) || 1;
      setF((v) => {
        const extraCount = Math.max(0, persons - 1);
        const extraNames = Array.from(
          { length: extraCount },
          (_, i) => v.extraNames?.[i] || ""
        );
        return {
          ...v,
          persons,
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f), // extraNames wird mitgeschickt
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fehler beim Senden");
      }

      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Fehler beim Senden. Bitte später nochmal versuchen 🙏");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="page py-6">
        <SEO title="Danke – Anmeldung" />
        <Card title="Danke für deine Zusage!">
          <p>
            Wir haben dich mit <b>{f.persons}</b> Person(en) vermerkt.
            {f.extraNames?.filter(Boolean).length > 0 && (
              <>
                <br />
                Mit dabei: {f.extraNames.filter(Boolean).join(", ")}
              </>
            )}
          </p>
          <a
            href="/"
            className="mt-2 inline-block px-4 py-2 rounded-xl bg-white shadow-soft"
          >
            Zur Startseite
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="page py-6">
      <SEO
        title="Anmeldung"
        description="Sag uns kurz Bescheid, mit wie vielen Personen du kommst."
      />
      <h2 className="text-2xl font-bold mb-3">Anmeldung</h2>
      <Card>
        <form onSubmit={onSubmit} className="grid gap-3 max-w-[560px]">
          <label className="grid gap-1">
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

          <label className="grid gap-1">
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

          <label className="grid gap-1">
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

          {/* 👇 Zusätzliche Namen, wenn mehr als 1 Person */}
          {f.persons > 1 && (
            <div className="grid gap-2 mt-1">
              {Array.from({ length: f.persons - 1 }).map((_, i) => (
                <label key={i} className="grid gap-1">
                  Name Mitgast {i + 2}
                  <input
                    type="text"
                    value={f.extraNames?.[i] || ""}
                    onChange={(e) => onExtraNameChange(i, e.target.value)}
                    placeholder={`Name der Person ${i + 2}`}
                    className="border rounded-xl px-3 py-2 bg-white/90"
                  />
                </label>
              ))}
            </div>
          )}

          <label className="grid gap-1">
            Trinker oder Fahrer? (optional)
            <input
              name="allergies"
              value={f.allergies}
              onChange={onChange}
              placeholder="hoffentlich kein Fahrer 😄"
              className="border rounded-xl px-3 py-2 bg-white/90"
            />
          </label>

          <label className="grid gap-1">
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
            className="px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:scale-[1.02] transition disabled:opacity-60"
          >
            {sending ? "Wird gesendet…" : "Zusage senden"}
          </button>

          <p className="text-slate-500 text-sm">
            Datenschutz: Angaben nur zur Organisation der Feier.
          </p>
        </form>
      </Card>
    </div>
  );
}
