// /api/rsvp.js
import nodemailer from "nodemailer";
import { Redis } from "@upstash/redis";

// 👇 Redis-Client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 🔐 Admin-API-Key aus Environment
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// Hilfsfunktion: simple ID
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// kleine Helper-Funktion gegen kaputtes HTML
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function envOrEmpty(v) {
  return typeof v === "string" ? v.trim() : "";
}

// Gmail-Transport (SMTP)
function createMailer() {
  const user = envOrEmpty(process.env.EMAIL_USER);
  const pass = envOrEmpty(process.env.EMAIL_PASS);

  if (!user || !pass) {
    throw new Error("EMAIL_USER oder EMAIL_PASS fehlt.");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export default async function handler(req, res) {
  // CORS (optional, hilfreich lokal)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-key");
  if (req.method === "OPTIONS") return res.status(200).end();

  // 🔐 Helper für Admin-Endpunkte (GET/DELETE)
  const requireAdmin = () => {
    if (!ADMIN_API_KEY) {
      res
        .status(500)
        .json({ error: "ADMIN_API_KEY ist auf dem Server nicht gesetzt." });
      return false;
    }
    const headerKey = req.headers["x-admin-key"];
    if (!headerKey || headerKey !== ADMIN_API_KEY) {
      res.status(401).json({ error: "Nicht autorisiert." });
      return false;
    }
    return true;
  };

  try {
    // ------------------------------------------------------------------
    // POST  → speichern / aktualisieren (öffentlich)
    // ------------------------------------------------------------------
    if (req.method === "POST") {
      const {
        attend, // "yes" | "no"
        name,
        phone,
        persons,
        allergies,
        message,
        extraNames,
      } = req.body || {};

      // 0 Personen (Absage) ist erlaubt
      const personsNum = Number(persons);
      if (!name || !phone || Number.isNaN(personsNum)) {
        return res.status(400).json({
          error: "Missing fields or invalid: name, phone, persons",
        });
      }

      const normPhone = String(phone).trim();
      const now = new Date().toISOString();

      const phonesSetKey = "rsvp:beach:phones";
      const entryKey = `rsvp:beach:entry:${normPhone}`;

      // 🔍 Bestehenden Eintrag laden (falls vorhanden)
      let existing = null;
      try {
        const raw = await redis.get(entryKey);
        if (raw && typeof raw === "object") {
          existing = raw;
        } else if (raw && typeof raw === "string") {
          existing = JSON.parse(raw);
        }
      } catch (err) {
        console.error("Fehler beim Lesen existierender RSVP aus Redis:", err);
      }

      const hasExisting = !!(existing && existing.id);

      const id = hasExisting ? existing.id : makeId();
      const createdAt = hasExisting
        ? existing.createdAt || existing.ts || now
        : now;
      const version = hasExisting ? Number(existing.version || "1") + 1 : 1;
      const updatedAt = now;
      const changed = hasExisting;

      // Zusage/Absage konsistent
      const attendNorm = attend === "no" || personsNum === 0 ? "no" : "yes";
      const status = attendNorm === "no" ? "cancelled" : "confirmed";

      const extraList = Array.isArray(extraNames)
        ? extraNames.filter(Boolean)
        : [];

      const entry = {
        id,
        attend: attendNorm,
        status,
        name,
        phone: normPhone,
        persons: personsNum,
        allergies: allergies || "",
        message: message || "",
        extraNames: extraList,
        ts: createdAt,
        createdAt,
        updatedAt,
        changed,
        version,
      };

      const tsDisplay = new Date(updatedAt).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      });

      const mitgaesteText = extraList.length
        ? extraList.map((n, i) => `• Person ${i + 2}: ${n}`).join("\n")
        : "— keine weiteren Namen angegeben —";

      const statusText = changed ? "AKTUALISIERTE Anmeldung" : "Neue Anmeldung";
      const attendText = attendNorm === "no" ? "ABSAGE" : "ZUSAGE";

      // 📝 Text-Body
      const textBody = `
${statusText} (${attendText}) für die Beach Wedding

Basisdaten
──────────
Name:           ${entry.name}
Telefon:        ${entry.phone}
Personen:       ${entry.persons}

Weitere Gäste
──────────────
${mitgaesteText}

Trinker oder Fahrer?
────────────────────
${entry.allergies || "— keine Angabe —"}

Nachricht
─────────
${entry.message || "— keine Nachricht —"}

Meta
────
Erstellt am:      ${new Date(createdAt).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      })}
Zuletzt geändert: ${tsDisplay}
Status:           ${entry.status}
Attend:           ${entry.attend}
Version:          ${version}
ID:               ${entry.id}
`.trim();

      // ✨ HTML-Version
      const htmlBody = `
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #111827;">
  <h2 style="margin-bottom: 0.5rem;">
    ${statusText} (${attendText}) für die Beach Wedding
  </h2>
  <p style="margin-top: 0; color: #6b7280; font-size: 0.9rem;">
    Erstellt: ${new Date(createdAt).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
    })}<br/>
    Zuletzt geändert: ${tsDisplay}<br/>
    Status: ${escapeHtml(entry.status)}<br/>
    ID: ${escapeHtml(entry.id)}<br/>
    Version: ${version}
  </p>

  <h3 style="margin-top: 1.5rem; margin-bottom: 0.25rem;">Basisdaten</h3>
  <table style="border-collapse: collapse; font-size: 0.95rem;">
    <tbody>
      <tr>
        <td style="padding: 2px 8px 2px 0; font-weight: 600;">Name:</td>
        <td>${escapeHtml(entry.name)}</td>
      </tr>
      <tr>
        <td style="padding: 2px 8px 2px 0; font-weight: 600;">Telefon:</td>
        <td>${escapeHtml(entry.phone)}</td>
      </tr>
      <tr>
        <td style="padding: 2px 8px 2px 0; font-weight: 600;">Personen:</td>
        <td>${entry.persons}</td>
      </tr>
    </tbody>
  </table>

  <h3 style="margin-top: 1.5rem; margin-bottom: 0.25rem;">Weitere Gäste</h3>
  ${
    extraList.length
      ? `<ul style="margin: 0 0 0.75rem 1.1rem; padding: 0;">
          ${extraList
            .map(
              (n, i) =>
                `<li>Person ${i + 2}: <strong>${escapeHtml(n)}</strong></li>`
            )
            .join("")}
        </ul>`
      : `<p style="margin: 0 0 0.75rem 0; color: #6b7280;">
           Keine weiteren Namen angegeben.
         </p>`
  }

  <h3 style="margin-top: 1.5rem; margin-bottom: 0.25rem;">Trinker oder Fahrer?</h3>
  <p style="margin: 0 0 0.75rem 0;">
    ${
      entry.allergies
        ? escapeHtml(entry.allergies)
        : '<span style="color:#6b7280;">Keine Angabe.</span>'
    }
  </p>

  <h3 style="margin-top: 1.5rem; margin-bottom: 0.25rem;">Nachricht</h3>
  <p style="white-space: pre-wrap; margin: 0 0 0.75rem 0;">
    ${
      entry.message
        ? escapeHtml(entry.message)
        : '<span style="color:#6b7280;">Keine Nachricht.</span>'
    }
  </p>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb;" />
  <p style="font-size: 0.8rem; color: #9ca3af;">
    Diese E-Mail wurde automatisch vom Anmeldeformular der Beach Wedding generiert.
  </p>
</div>
`;

      // 🔹 RSVP in Redis speichern (1 Eintrag pro Telefonnummer)
      try {
        await redis.set(entryKey, entry);
        await redis.sadd(phonesSetKey, normPhone);
      } catch (err) {
        console.error("Fehler beim Speichern in Redis:", err);
      }

      // 🔹 E-Mail senden via Gmail SMTP
      try {
        const user = envOrEmpty(process.env.EMAIL_USER);
        const to = envOrEmpty(process.env.EMAIL_TO);
        const from =
          envOrEmpty(process.env.EMAIL_FROM) || `Beach Wedding <${user}>`;

        if (!user || !to) {
          console.warn("EMAIL_USER oder EMAIL_TO fehlen – keine Mail versendet.");
        } else {
          const transporter = createMailer();

          const subject = `${statusText} (${attendText}): ${entry.name} (${entry.persons})`;

          await transporter.sendMail({
            from,
            to,
            subject,
            text: textBody,
            html: htmlBody,
          });
        }
      } catch (err) {
        console.error("Fehler beim Senden der E-Mail (Gmail SMTP):", err);
      }

      return res
        .status(201)
        .json({ ok: true, id, changed, status, attend: attendNorm });
    }

    // ------------------------------------------------------------------
    // DELETE  → Eintrag per Telefonnummer löschen (nur Admin)
    // ------------------------------------------------------------------
    if (req.method === "DELETE") {
      if (!requireAdmin()) return;

      try {
        const { phone } = req.body || {};
        if (!phone) {
          return res
            .status(400)
            .json({ error: "Telefonnummer zum Löschen erforderlich" });
        }

        const normPhone = String(phone).trim();
        const phonesSetKey = "rsvp:beach:phones";
        const entryKey = `rsvp:beach:entry:${normPhone}`;

        await redis.del(entryKey);
        await redis.srem(phonesSetKey, normPhone);

        return res.status(200).json({ ok: true });
      } catch (err) {
        console.error("Fehler beim Löschen eines RSVP-Eintrags:", err);
        return res.status(500).json({ error: "Delete failed" });
      }
    }

    // ------------------------------------------------------------------
    // GET  → alle RSVPs für Admin laden (nur Admin)
    // ------------------------------------------------------------------
    if (req.method === "GET") {
      if (!requireAdmin()) return;

      // 🔐 nur zum Login-Test (Admin-Login-Seite)
      if (req.query.authCheck) {
        return res.status(200).json({ ok: true });
      }

      const phonesSetKey = "rsvp:beach:phones";

      let phones = [];
      try {
        phones = await redis.smembers(phonesSetKey);
      } catch (err) {
        console.error("Fehler beim Lesen der Telefonliste aus Redis:", err);
      }

      const rows = [];

      for (const phone of phones || []) {
        try {
          const entryKey = `rsvp:beach:entry:${phone}`;
          const raw = await redis.get(entryKey);
          if (!raw) continue;

          if (typeof raw === "object") {
            rows.push(raw);
          } else if (typeof raw === "string") {
            try {
              rows.push(JSON.parse(raw));
            } catch (err) {
              console.error("Konnte Eintrag nicht parsen, überspringe:", phone);
            }
          }
        } catch (err) {
          console.error("Fehler beim Laden eines RSVP-Eintrags:", err);
        }
      }

      // 🔽 Neueste zuerst
      rows.sort((a, b) => {
        const ta = new Date(a.updatedAt || a.createdAt || a.ts || 0).getTime();
        const tb = new Date(b.updatedAt || b.createdAt || b.ts || 0).getTime();
        return tb - ta;
      });

      return res.status(200).json(rows);
    }

    // ------------------------------------------------------------------
    // andere Methoden blocken
    // ------------------------------------------------------------------
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("Unerwarteter Fehler in /api/rsvp:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
