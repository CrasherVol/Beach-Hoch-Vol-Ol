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

  // 🔐 Login-Status & Key
  const [passwordInput, setPasswordInput] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Beim Laden schauen, ob im Tab schon eingeloggt
  useEffect(() => {
    const storedKey = sessionStorage.getItem("admin_key");
    if (storedKey) {
      setAdminKey(storedKey);
      setAuthenticated(true);
    } else {
      setLoading(false); // sonst „Lade Einträge…“ ohne Login
    }
  }, []);

  // Daten nur laden, wenn eingeloggt + Key vorhanden
  useEffect(() => {
    if (!authenticated || !adminKey) return;

    const load = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch("/api/rsvp", {
          headers: {
            "x-admin-key": adminKey,
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            setAuthenticated(false);
            setAdminKey("");
            sessionStorage.removeItem("admin_key");
            setErr("Nicht autorisiert – bitte neu einloggen.");
            return;
          }
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
  }, [authenticated, adminKey]);

  const handleDelete = async (email) => {
    const ok = window.confirm(
      `Eintrag mit E-Mail "${email}" wirklich dauerhaft löschen?`
    );
    if (!ok) return;

    try {
      const res = await fetch("/api/rsvp", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
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
    a.download = "rsvp-export.csv";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (!passwordInput.trim()) {
      setAuthError("Bitte ein Kennwort eingeben.");
      return;
    }

    try {
      setLoading(true);
      // Test-Request an API – wenn 200 => Passwort korrekt
      const res = await fetch("/api/rsvp?authCheck=1", {
        headers: {
          "x-admin-key": passwordInput.trim(),
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setAuthError("Falsches Kennwort.");
        } else {
          setAuthError("Serverfehler beim Login.");
        }
        return;
      }

      // Passwort ist korrekt
      setAdminKey(passwordInput.trim());
      setAuthenticated(true);
      sessionStorage.setItem("admin_key", passwordInput.trim());
      setAuthError("");
    } catch (e2) {
      console.error(e2);
      setAuthError("Netzwerkfehler beim Login.");
    } finally {
      setLoading(false);
    }
  };

  // 🔒 Login-Screen, wenn nicht eingeloggt
  if (!authenticated) {
    return (
      <div className="page py-10 px-4 sm:px-5 md:px-6">
        <SEO title="admin login" description="Admin-Login zur RSVP-Übersicht" />
        <div className="max-w-sm mx-auto">
          <Card>
            <h1 className="text-xl sm:text-2xl font-bold mb-3">
              Admin-Bereich
            </h1>
            <p className="text-sm text-slate-600 mb-4">
              Dieser Bereich ist nur für uns gedacht. Bitte gib das Kennwort ein.
            </p>
            <form onSubmit={handleLogin} className="grid gap-3">
              <label className="grid gap-1 text-sm">
                Kennwort
                <input
                  type="password"
                  className="border rounded-xl px-3 py-2 bg-white/90"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoComplete="current-password"
                />
              </label>
              {authError && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  {authError}
                </p>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-emerald-500 to-orange-400 shadow-soft hover:scale-[1.02] transition text-sm"
              >
                Login
              </button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // ✅ ab hier: echte Admin-Ansicht
  return (
    <div className="page py-6 sm:py-8 px-4 sm:px-5 md:px-6">
      <SEO title="admin" description="RSVP-Übersicht & Export" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">admin – RSVPs</h2>

        {/* Statusmeldungen */}
        {loading && (
          <p className="text-slate-500 mb-4 text-sm sm:text-base">
            Lade Einträge…
          </p>
        )}
        {err && (
          <p className="text-red-600 mb-4 text-sm sm:text-base">{err}</p>
        )}

        {!loading && !err && (
          <>
            {list.length > 0 ? (
              <>
                {/* Dashboard-Kacheln */}
                <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4 mb-4">
                  <Card>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Anmeldungen
                      </span>
                      <span className="text-xl sm:text-2xl font-semibold">
                        {derived.totalRsvps}
                      </span>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Teilnehmerzahl
                      </span>
                      <span className="text-xl sm:text-2xl font-semibold">
                        {derived.totalPersons}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 mt-1">
                        (Basis + eingetragene Personen)
                      </span>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Mitgäste gesamt
                      </span>
                      <span className="text-xl sm:text-2xl font-semibold">
                        {derived.totalExtra}
                      </span>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Absagen
                      </span>
                      <span className="text-xl sm:text-2xl font-semibold">
                        {derived.cancellations}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 mt-1">
                        (persons = 0 oder status = &quot;cancelled&quot;)
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Toolbar */}
                <div className="mb-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 justify-between">
                  <div className="flex flex-col text-xs sm:text-sm text-slate-500">
                    <span>Letzte Anmeldung: {lastTsDisplay}</span>
                    <span>Gesamt: {derived.totalRsvps} Einträge</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Suche nach Name, E-Mail, Nachricht…"
                      className="px-3 py-2 rounded-xl border border-slate-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 w-full sm:w-72"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn primary text-sm whitespace-nowrap"
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
                    <table className="min-w-full text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-left">
                          <th className="p-2 border-b">
                            <button
                              type="button"
                              className="flex items-center gap-1"
                              onClick={() => handleSort("name")}
                            >
                              Name{" "}
                              <span className="text-[10px]">
                                {sortIndicator("name")}
                              </span>
                            </button>
                          </th>
                          <th className="p-2 border-b">
                            <button
                              type="button"
                              className="flex items-center gap-1"
                              onClick={() => handleSort("email")}
                            >
                              E-Mail{" "}
                              <span className="text-[10px]">
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
                              <span className="text-[10px]">
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
                              <span className="text-[10px]">
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
                              <span className="text-[10px]">
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
                              <span className="text-[10px]">
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
                                <div className="font-medium break-words">
                                  {r.name}
                                </div>
                                {r.changed && (
                                  <div className="text-[10px] text-amber-600">
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
                              <td className="p-2 align-top whitespace-nowrap">
                                {formatDate(created)}
                              </td>
                              <td className="p-2 align-top whitespace-nowrap">
                                {updated ? formatDate(updated) : "–"}
                              </td>
                              <td className="p-2 align-top text-center">
                                <button
                                  className="text-[11px] px-2 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
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
                              className="p-4 text-center text-slate-500 text-sm"
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
                <p className="text-slate-600 text-sm sm:text-base">
                  Noch keine Zusagen eingegangen.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
