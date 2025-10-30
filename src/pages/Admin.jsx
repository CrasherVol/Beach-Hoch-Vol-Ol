import Card from '../components/Card.jsx'
import SEO from '../components/SEO.jsx'

function toCSV(rows){
  const headers = Object.keys(rows[0]||{name:'',email:'',persons:'',allergies:'',message:'',ts:''})
  const esc = v => String(v??'').replace(/"/g,'""')
  const head = headers.map(h=>`"${esc(h)}"`).join(',')
  const body = rows.map(r=>headers.map(h=>`"${esc(r[h])}"`).join(',')).join('\n')
  return head + '\n' + body
}

export default function Admin(){
  const list = JSON.parse(localStorage.getItem('rsvp-list')||'[]')
  const download = () => {
    const csv = toCSV(list)
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'rsvp-export.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }
  return (
    <div className="page">
      <SEO title="Admin" description="RSVP-Export als CSV" />
      <h2>Admin – RSVPs</h2>
      <Card>
        <p>Einträge: <b>{list.length}</b></p>
        <button className="btn primary" onClick={download}>CSV exportieren</button>
      </Card>
      <div className="grid2" style={{marginTop:12}}>
        {list.map((r,i)=>(
          <Card key={i} title={r.name + ' (' + r.persons + ')'}>
            <div><b>E‑Mail:</b> {r.email}</div>
            {r.allergies && <div><b>Allergien:</b> {r.allergies}</div>}
            {r.message && <div><b>Nachricht:</b> {r.message}</div>}
            <div><b>Zeit:</b> {new Date(r.ts).toLocaleString('de-DE')}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
