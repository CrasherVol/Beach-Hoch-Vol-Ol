// src/pages/admin.jsx
import { useEffect, useState, useMemo } from "react";
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
      createdAt: "",
      updatedAt: "",
      changed: "",
      version: "",
    }
  );
  const esc = (v) => String(v ?? "").replace(/"/g, '""');
  const head = headers.map((h) => `"${esc(h)}"`).join(",");
  const body = rows
    .map((r) =>
      headers
        .map((h) => {
          const value = Array.isArray(r[h]) ? r[h].join(", ") : r[h];
          return `"${esc(value)}"`;
        })
        .join(",")
    )
    .join("\n");
  return head + "\n" + body;
}

function formatDate(value) {
  if (!value) return "–";
  try {
    return new Date(value).toLocaleString("de-DE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return String(value);
  }
}

export default function Admin() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "created",
    direction: "desc",
  });
  const [search, setSearch] = useState("");

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

  const handleDelete = async (email) => {
    const ok = window.confirm(
      `Eintrag mit E-Mail "${email}" wirklich dauerhaft löschen?`
    );
    if (!ok) return;

    try {
      const res = await fetch("/api/rsvp", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error("Löschen fehlgeschlagen");
      }
      setList((prev) => prev.filter((r) => r.email !== email));
    } catch (e) {
      console.error(e);
      alert("Konnte Eintrag nicht löschen.");
    }
  };

  const handleDownload = () => {
    if (!list.length) return;
    const csv = toCSV(list);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rsvp-export.csv"; // Excel-kompatibel
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortIndicator = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const derived = useMemo(() => {
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

    // "Absagen": Hier interpretieren wir Einträge mit persons === 0 oder status "cancelled"
    const cancellations = list.filter(
      (r) =>
        String(r.status).toLowerCase() === "cancelled" ||
        Number(r.persons) === 0
    ).length;

    const lastCreated =
      list[0]?.createdAt || list[0]?.ts || list[0]?.updatedAt || null;

    return {
      totalRsvps,
      totalPersons,
      totalExtra,
      cancellations,
      lastCreated,
    };
  }, [list]);

  const filteredAndSorted = useMemo(() => {
    const normSearch = search.trim().toLowerCase();

    const filtered = list.filter((r) => {
      if (!normSearch) return true;
      const haystack = [
        r.name,
        r.email,
        r.message,
        ...(Array.isArray(r.extraNames) ? r.extraNames : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normSearch);
    });

    const getSortValue = (r, key) => {
      switch (key) {
        case "name":
          return (r.name || "").toLowerCase();
        case "email":
          return (r.email || "").toLowerCase();
        case "persons":
          return Number(r.persons) || 0;
        case "extra":
          return Array.isArray(r.extraNames) ? r.extraNames.length : 0;
        case "created":
          return new Date(r.createdAt || r.ts || 0).getTime();
        case "updated":
          return new Date(r.updatedAt || r.createdAt || r.ts || 0).getTime();
        default:
          return r[key] ?? "";
      }
    };

    const sorted = [...filtered].sort((a, b) => {
      const aVal = getSortValue(a, sortConfig.key);
      const bVal = getSortValue(b, sortConfig.key);
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [list, sortConfig, search]);

  const lastTsDisplay = derived.lastCreated
    ? formatDate(derived.lastCreated)
    : "–";

  return (
    <div className="page py-6">
      <SEO title="admin" description="RSVP-Übersicht & Export" />
      <h2 className="text-2xl font-bold mb-4">admin – RSVPs</h2>

      {/* Statusmeldungen */}
      {loading && <p className="text-slate-500 mb-4">Lade Einträge…</p>}
      {err && <p className="text-red-600 mb-4">{err}</p>}

      {!loading && !err && (
        <>
          {list.length > 0 ? (
            <>
              {/* Dashboard-Kacheln */}
              <div className="grid gap-4 md:grid-cols-4 mb-4">
                <Card>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Anmeldungen
                    </span>
                    <span className="text-2xl font-semibold">
                      {derived.totalRsvps}
                    </span>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Teilnehmerzahl
                    </span>
                    <span className="text-2xl font-semibold">
                      {derived.totalPersons}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      (Basis + eingetragene Personen)
                    </span>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Mitgäste gesamt
                    </span>
                    <span className="text-2xl font-semibold">
                      {derived.totalExtra}
                    </span>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Absagen
                    </span>
                    <span className="text-2xl font-semibold">
                      {derived.cancellations}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      (persons = 0 oder status = &quot;cancelled&quot;)
                    </span>
                  </div>
                </Card>
              </div>

              {/* Toolbar */}
              <div className="mb-4 flex flex-wrap items-center gap-3 justify-between">
                <div className="flex flex-col text-sm text-slate-500">
                  <span>Letzte Anmeldung: {lastTsDisplay}</span>
                  <span>Gesamt: {derived.totalRsvps} Einträge</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Suche nach Name, E-Mail, Nachricht…"
                    className="px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn primary"
                    onClick={handleDownload}
                    disabled={!list.length}
                  >
                    CSV / Excel Export
                  </button>
                </div>
              </div>

              {/* Tabelle */}
              <Card>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-left">
                        <th className="p-2 border-b">
                          <button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={() => handleSort("name")}
                          >
                            Name <span className="text-xs">{sortIndicator("name")}</span>
                          </button>
                        </th>
                        <th className="p-2 border-b">
                          <button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={() => handleSort("email")}
                          >
                            E-Mail{" "}
                            <span className="text-xs">
                              {sortIndicator("email")}
                            </span>
                          </button>
                        </th>
                        <th className="p-2 border-b text-right">
                          <button
                            type="button"
                            className="flex items-center gap-1 ml-auto"
                            onClick={() => handleSort("persons")}
                          >
                            Personen{" "}
                            <span className="text-xs">
                              {sortIndicator("persons")}
                            </span>
                          </button>
                        </th>
                        <th className="p-2 border-b text-right">
                          <button
                            type="button"
                            className="flex items-center gap-1 ml-auto"
                            onClick={() => handleSort("extra")}
                          >
                            Mitgäste{" "}
                            <span className="text-xs">
                              {sortIndicator("extra")}
                            </span>
                          </button>
                        </th>
                        <th className="p-2 border-b">Trinker/Fahrer</th>
                        <th className="p-2 border-b">Nachricht</th>
                        <th className="p-2 border-b">
                          <button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={() => handleSort("created")}
                          >
                            Erstellt{" "}
                            <span className="text-xs">
                              {sortIndicator("created")}
                            </span>
                          </button>
                        </th>
                        <th className="p-2 border-b">
                          <button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={() => handleSort("updated")}
                          >
                            Geändert{" "}
                            <span className="text-xs">
                              {sortIndicator("updated")}
                            </span>
                          </button>
                        </th>
                        <th className="p-2 border-b text-center">Aktion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSorted.map((r, i) => {
                        const extra = Array.isArray(r.extraNames)
                          ? r.extraNames
                          : [];
                        const created = r.createdAt || r.ts;
                        const updated = r.updatedAt;

                        return (
                          <tr
                            key={r.id || r.email || i}
                            className="border-b last:border-b-0 hover:bg-slate-50/70"
                          >
                            <td className="p-2 align-top">
                              <div className="font-medium">{r.name}</div>
                              {r.changed && (
                                <div className="text-xs text-amber-600">
                                  geändert (Version {r.version || 1})
                                </div>
                              )}
                            </td>
                            <td className="p-2 align-top">
                              <a
                                href={`mailto:${r.email}`}
                                className="text-emerald-600 hover:underline break-all"
                              >
                                {r.email}
                              </a>
                            </td>
                            <td className="p-2 align-top text-right">
                              {r.persons || 0}
                            </td>
                            <td className="p-2 align-top text-right">
                              {extra.length || 0}
                            </td>
                            <td className="p-2 align-top">
                              {r.allergies ? r.allergies : "–"}
                            </td>
                            <td className="p-2 align-top max-w-xs">
                              {r.message ? (
                                <span className="line-clamp-3">
                                  {r.message}
                                </span>
                              ) : (
                                "–"
                              )}
                            </td>
                            <td className="p-2 align-top">
                              {formatDate(created)}
                            </td>
                            <td className="p-2 align-top">
                              {updated ? formatDate(updated) : "–"}
                            </td>
                            <td className="p-2 align-top text-center">
                              <button
                                className="text-xs px-2 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => handleDelete(r.email)}
                              >
                                Löschen
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredAndSorted.length === 0 && (
                        <tr>
                          <td
                            colSpan={9}
                            className="p-4 text-center text-slate-500"
                          >
                            Keine Einträge für die aktuelle Suche.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <p className="text-slate-600">
                Noch keine Zusagen eingegangen.
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
