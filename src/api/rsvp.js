// /api/rsvp.js
import { Resend } from 'resend'
import { put, list } from '@vercel/blob'

// Hilfsfunktion: simple ID
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

// kleine Helper-Funktion gegen kaputtes HTML
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default async function handler(req, res) {
  // CORS (optional, hilfreich lokal)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'POST') {
      const {
        name,
        email,
        persons,
        allergies,
        message,
        extraNames, // 👈 Mitgäste
      } = req.body || {}

      if (!name || !email || !persons) {
        return res.status(400).json({
          error: 'Missing fields: name, email, persons',
        })
      }

      const entry = {
        id: makeId(),
        name,
        email,
        persons: Number(persons),
        allergies: allergies || '',
        message: message || '',
        extraNames: Array.isArray(extraNames)
          ? extraNames.filter(Boolean) // leere Strings rausfiltern
          : [],
        ts: new Date().toISOString(),
      }

      const tsDisplay = new Date(entry.ts).toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin',
      })

      const mitgaesteList = entry.extraNames
      const mitgaesteText = mitgaesteList.length
        ? mitgaesteList.map((n, i) => `• Person ${i + 2}: ${n}`).join('\n')
        : '— keine weiteren Namen angegeben —'

      // 📝 Schöner Text-Body
      const textBody = `
Neue Zusage für die Beach Wedding

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
${entry.allergies || '— keine Angabe —'}

Nachricht
─────────
${entry.message || '— keine Nachricht —'}

Meta
────
Zeit:           ${tsDisplay}
ID:             ${entry.id}
`.trim()

      // ✨ HTML-Version – hübsch formatiert
      const htmlBody = `
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #111827;">
  <h2 style="margin-bottom: 0.5rem;">Neue Zusage für die Beach Wedding 🎉</h2>
  <p style="margin-top: 0; color: #6b7280; font-size: 0.9rem;">
    Eingang: ${tsDisplay}<br/>
    ID: ${entry.id}
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
    mitgaesteList.length
      ? `<ul style="margin: 0 0 0.75rem 1.1rem; padding: 0;">
          ${mitgaesteList
            .map(
              (n, i) =>
                `<li>Person ${i + 2}: <strong>${escapeHtml(n)}</strong></li>`
            )
            .join('')}
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
`

      // 1 Blob pro RSVP → keine Race Conditions
      await put(`rsvps/${entry.id}.json`, JSON.stringify(entry), {
        access: 'private',
        contentType: 'application/json',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })

      // E-Mail senden via Resend
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `Neue RSVP: ${entry.name} (${entry.persons})`,
        text: textBody,
        html: htmlBody,
      })

      return res.status(201).json({ ok: true, id: entry.id })
    }

    if (req.method === 'GET') {
      // Alle RSVP-Blobs listen (bei vielen: optional limit/pagination)
      const { blobs } = await list({
        prefix: 'rsvps/',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })

      // Neueste zuerst
      blobs.sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
      )

      // Inhalte laden (kleine Menge → ok)
      const rows = []
      for (const b of blobs) {
        const r = await fetch(b.url)
        rows.push(await r.json())
      }
      return res.status(200).json(rows)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Server error' })
  }
}
