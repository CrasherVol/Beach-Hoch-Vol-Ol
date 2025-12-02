// src/pages/admin.jsx
import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import SEO from "../components/SEO.jsx";

function toCSV(rows) {
  const headers = Object.keys(
    rows[0] || {
      id: "",
      name: "",
      email: "",
      persons: "",
      allergies: "",
      message: "",
      extraNames: "",
      ts: "",
    }
  );
  const esc = (v) => String(v ?? "").replace(/"/g, '""');
  const head = headers.map((h) => `"${esc(h)}"`).join(",");
  const body = rows
    .map((r) =>
      headers
        .map((h) => {
          // Arrays (z.B. extraNames) als kommagetrennte Liste
          const value = Array.isArray(r[h]) ? r[h].join(", ") : r[h];
          return `"${esc(value)}"`;
        })
        .join(",")
    )
    .join("\n");
  return head + "\n" + body;
}

export default function admin() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch("/api/rsvp");
        if (!res.ok) {
          throw new Error("Fehler beim Laden");
        }
        const data = await res.json();
        setList(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Konnte RSVPs nicht laden.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const download = () => {
    if (!list.length) return;
    const csv = toCSV(list);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rsvp-export.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const totalRsvps = list.length;
  const totalPersons = list.reduce(
    (sum, r) => sum + (Number(r.persons) || 0),
    0
  );
  const totalExtra = list.reduce(
    (sum, r) =>
      sum + (Array.isArray(r.extraNames) ? r.extraNames.length : 0),
    0
  );
  const lastTs = list[0]?.ts;
  const lastTsDisplay = lastTs
    ? new Date(lastTs).toLocaleString("de-DE", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "–";

  return (
    <div className="page py-6">
      <SEO title="admin" description="RSVP-Übersicht & Export" />
      <h2 className="text-2xl font-bold mb-4">admin – RSVPs</h2>

      {/* Statusmeldungen */}
      {loading && <p className="text-slate-500 mb-4">Lade Einträge…</p>}
      {err && (
        <p className="text-red-600 mb-4">
          {err}
        </p>
      )}

      {!loading && !err && (
        <>
          {/* Dashboard-Kacheln */}
          {list.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <Card>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Zusagen
                    </span>
                    <span className="text-2xl font-semibold">
                      {totalRsvps}
                    </span>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Gesamtpersonen
                    </span>
                    <span className="text-2xl font-semibold">
                      {totalPersons}
                    </span>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Mitgäste gesamt
                    </span>
                    <span className="text-2xl font-semibold">
                      {totalExtra}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      (zusätzlich eingetragene Namen)
                    </span>
                  </div>
                </Card>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <p className="text-sm text-slate-500">
                  Letzte Anmeldung: {lastTsDisplay}
                </p>
                <button
                  className="btn primary"
                  onClick={download}
                  disabled={!list.length}
                >
                  CSV exportieren
                </button>
              </div>
            </>
          ) : (
            <Card>
              <p className="text-slate-600">
                Noch keine Zusagen eingegangen.
              </p>
            </Card>
          )}

          {/* Detail-Liste */}
          <div className="grid2" style={{ marginTop: 12 }}>
            {list.map((r, i) => {
              const extra = Array.isArray(r.extraNames) ? r.extraNames : [];
              const ts = r.ts
                ? new Date(r.ts).toLocaleString("de-DE")
                : "–";

              return (
                <Card key={r.id || i} title={`${r.name} (${r.persons})`}>
 {/* NEU: Hinweis, falls Eintrag geändert wurde */}
  {r.changed && (
    <div className="text-xs text-amber-600 font-semibold mb-1">
      Geändert am{" "}
      {r.updatedAt
        ? new Date(r.updatedAt).toLocaleString("de-DE")
        : "–"}
      {r.version && ` (Version ${r.version})`}
    </div>
  )}

  <div>
    <b>E-Mail:</b>{" "}
    <a
      href={`mailto:${r.email}`}
      className="text-emerald-600 hover:underline"
    >
      {r.email}
    </a>
  </div>

                  {extra.length > 0 && (
                    <div style={{ marginTop: 4 }}>
                      <b>Mitgäste:</b>
                      <ul className="list-disc pl-5">
                        {extra.map((n, idx) => (
                          <li key={idx}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {r.allergies && (
                    <div style={{ marginTop: 4 }}>
                      <b>Trinker/Fahrer:</b> {r.allergies}
                    </div>
                  )}
                  {r.message && (
                    <div style={{ marginTop: 4 }}>
                      <b>Nachricht:</b> {r.message}
                    </div>
                  )}
                  <div style={{ marginTop: 4 }}>
                    <b>Zeit:</b> {ts}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
