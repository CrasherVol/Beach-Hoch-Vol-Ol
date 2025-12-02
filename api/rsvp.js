// /api/rsvp.js
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

// 👇 Redis-Client – gleiche ENV-Variablen wie im anderen Projekt
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Hilfsfunktion: simple ID
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// kleine Helper-Funktion gegen kaputtes HTML
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req, res) {
  // CORS (optional, hilfreich lokal)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "POST") {
      const { name, email, persons, allergies, message, extraNames } =
        req.body || {};

      if (!name || !email || !persons) {
        return res
          .status(400)
          .json({ error: "Missing fields: name, email, persons" });
      }

      const normEmail = String(email).trim().toLowerCase();
      const now = new Date().toISOString();

      const emailsSetKey = "rsvp:beach:emails";
      const entryKey = `rsvp:beach:entry:${normEmail}`;

      // 🔍 Bisherigen Eintrag für diese Mail laden (falls vorhanden)
      let existing = null;
      try {
        const raw = await redis.get(entryKey);
        if (raw) {
          existing = JSON.parse(raw);
        }
      } catch (err) {
        console.error("Fehler beim Lesen existierender RSVP aus Redis:", err);
      }

      const hasExisting = !!(existing && existing.id);

      const id = hasExisting ? existing.id : makeId();
      const createdAt = hasExisting
        ? existing.createdAt || existing.ts || now
        : now; // ursprüngliche Erstellzeit
      const version = hasExisting ? Number(existing.version || "1") + 1 : 1;
      const updatedAt = now;
      const changed = hasExisting; // true, wenn es eine Änderung ist

      const extraList = Array.isArray(extraNames)
        ? extraNames.filter(Boolean)
        : [];

      const entry = {
        id,
        name,
        email: normEmail,
        persons: Number(persons),
        allergies: allergies || "",
        message: message || "",
        extraNames: extraList,
        // für Abwärtskompatibilität: ts = erste Erstellung
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

      const statusText = changed
        ? "AKTUALISIERTE Anmeldung"
        : "Neue Anmeldung";

      // 📝 Text-Body
      const textBody = `
${statusText} für die Beach Wedding

Basisdaten
──────────
Name:           ${entry.name}
E-Mail:         ${entry.email}
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
Erstellt am:    ${new Date(createdAt).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      })}
Zuletzt geändert: ${tsDisplay}
Version:        ${version}
ID:             ${entry.id}
`.trim();

      // ✨ HTML-Version – hübsch formatiert
      const htmlBody = `
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #111827;">
  <h2 style="margin-bottom: 0.5rem;">
    ${statusText} für die Beach Wedding 🎉
  </h2>
  <p style="margin-top: 0; color: #6b7280; font-size: 0.9rem;">
    Erstellt: ${new Date(createdAt).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
    })}<br/>
    Zuletzt geändert: ${tsDisplay}<br/>
    ID: ${entry.id}<br/>
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
        <td style="padding: 2px 8px 2px 0; font-weight: 600;">E-Mail:</td>
        <td>${escapeHtml(entry.email)}</td>
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

      // 🔹 RSVP in Redis speichern (1 Eintrag pro E-Mail)
      try {
        await redis.set(entryKey, JSON.stringify(entry));
        await redis.sadd(emailsSetKey, normEmail);
      } catch (err) {
        console.error("Fehler beim Speichern in Redis:", err);
      }

      // 🔹 E-Mail senden via Resend (wie gehabt)
      try {
        if (
          process.env.RESEND_API_KEY &&
          process.env.MAIL_FROM &&
          process.env.MAIL_TO
        ) {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `${statusText}: ${entry.name} (${entry.persons})`,
            text: textBody,
            html: htmlBody,
          });
        } else {
          console.warn(
            "RESEND_API_KEY oder MAIL_FROM/MAIL_TO fehlen – keine Mail versendet."
          );
        }
      } catch (err) {
        console.error("Fehler beim Senden der E-Mail:", err);
      }

      // ✅ Antwort an Frontend
      return res.status(201).json({ ok: true, id, changed });
    }

    if (req.method === "GET") {
      const emailsSetKey = "rsvp:beach:emails";

      let emails = [];
      try {
        emails = await redis.smembers(emailsSetKey);
      } catch (err) {
        console.error("Fehler beim Lesen der E-Mail-Liste aus Redis:", err);
      }

      const rows = [];
      for (const email of emails || []) {
        try {
          const entryKey = `rsvp:beach:entry:${email}`;
          const raw = await redis.get(entryKey);
          if (!raw) continue;
          const parsed = JSON.parse(raw);
          rows.push(parsed);
        } catch (err) {
          console.error("Fehler beim Laden eines RSVP-Eintrags:", err);
        }
      }

      // Neueste zuerst (nach updatedAt oder ts)
      rows.sort((a, b) => {
        const ta = new Date(a.updatedAt || a.createdAt || a.ts || 0).getTime();
        const tb = new Date(b.updatedAt || b.createdAt || b.ts || 0).getTime();
        return tb - ta;
      });

      return res.status(200).json(rows);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("Unerwarteter Fehler in /api/rsvp:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
