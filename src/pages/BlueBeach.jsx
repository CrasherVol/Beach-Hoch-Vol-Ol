import Card from '../components/Card.jsx'
import SEO from '../components/SEO.jsx'

export default function BlueBeach(){
  return (
    <div className="page py-6">
      <SEO title="BlueBeach – Was ist das?" description="Eventlocation mit Sand, Palmen und Beachvolleyball – perfekte Strandbar-Atmosphäre."/>
      <h2 className="text-2xl font-bold mb-3">Was ist das BlueBeach in Witten?</h2>
      <div className="grid md:grid-cols-3 gap-3 my-4">
        <img src="/assets/bb-outdoor.webp" alt="BlueBeach Außenbereich" className="w-full h-[220px] object-cover rounded-2xl shadow-soft"/>
        <img src="/assets/bb-indoor.webp" alt="BlueBeach Indoorhalle" className="w-full h-[220px] object-cover rounded-2xl shadow-soft"/>
        <img src="/assets/bb-courts.jpg" alt="BlueBeach Beachplätze" className="w-full h-[220px] object-cover rounded-2xl shadow-soft"/>
      </div>


      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Strandfeeling">
          <p>Indoor‑Strand & Außenbereich mit Sand, Palmen und Lichterketten – Strandbar‑Atmosphäre mitten im Ruhrgebiet.</p>
        </Card>
        <Card title="Beachsport">
          <p>Mehrere Beachcourts (Indoor & Outdoor) für Beachvolleyball, Beach Soccer u. a. – 365 Tage im Jahr bespielbar.</p>
        </Card>
        <Card title="Beach Bar">
          <p>Der Bar‑Bereich bietet Drinks & Snacks; Tische können vorreserviert werden.</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card title="Für Events">
          <ul className="list-disc pl-6">
            <li>Flexibles Gelände im fünfstelligen m²‑Bereich (indoor & outdoor)</li>
            <li>Private Beach, BBQ, Kindergeburtstage, Teamevents</li>
            <li>Nähe Kemnader See – Urlaubsfeeling inklusive</li>
          </ul>
        </Card>
        <Card title="Kontakt & Service">
          <ul className="list-disc pl-6">
            <li>Adresse: Luhnsmühle 2, 58455 Witten</li>
            <li>Telefon: 02302‑580400 (Allgemein), 02302‑5804040 (Events)</li>
            <li>E‑Mail: rezeption@bluebeach.de</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
