import { useState } from 'react'
import Card from '../components/Card.jsx'
import SEO from '../components/SEO.jsx'

const SWATCHES = [
  { name: 'Sand',   hex: '#f4e7c6' },
  { name: 'Koralle',hex: '#fb7185' },
  { name: 'Türkis', hex: '#38bdf8' },
  { name: 'See',    hex: '#60a5fa' },
  { name: 'Weiß',   hex: '#ffffff' },
]

const MOOD = [
  { alt:'Hängematte & Sunset', src:'/assets/hero-hammock.jpg' },
  { alt:'Feiern mit Drinks',   src:'/assets/party-drinks.png' },
  { alt:'BlueBeach außen',     src:'/assets/bb-outdoor.webp' },
  { alt:'Beach-Details',       src:'/assets/beach-details.jpg' }, // Platzhalter ok
]

const IDEAS_SHE = [
  { title:'Leichtes Sommerkleid', note:'Leinen/Chiffon, Midi/Maxi', icon:'👗' },
  { title:'Elegante Sandalen',    note:'flach/Keil; sicher im Sand', icon:'🩴' },
  { title:'Feine Accessoires',    note:'z. B. Perlen, Gold, Tuch', icon:'💍' },
]

const IDEAS_HE = [
  { title:'Leinenhemd',           note:'weiß, ecru, pastell', icon:'👔' },
  { title:'Chino/Leinenhose',     note:'hell; ggf. Shorts', icon:'🩳' },
  { title:'Leichte Loafer/Sneaker',note:'sauber, sandtauglich', icon:'👟' },
]

const IDEAS_UNI = [
  { title:'Pastell & Naturtöne',  note:'Sand, Koralle, Türkis', icon:'🎨' },
  { title:'Sonnenhut / Shades',   note:'praktisch + fotogen', icon:'🕶️' },
  { title:'Leichte Layer',        note:'Leinenblazer/Strick', icon:'🧥' },
]

export default function Dresscode(){
const [tab, setTab] = useState('uni')


  const ideaList = tab === 'she' ? IDEAS_SHE : tab === 'he' ? IDEAS_HE : IDEAS_UNI

  return (
    <div className="page py-6">
      <SEO
        title="Dresscode – Elegant & Beachy"
        description="Inspirationen für elegante Strandoutfits: Farben, Moodboard, Do/Don't und Outfitideen."
      />

      {/* Hero: spielerische Emojis schweben */}
      <section className="relative overflow-hidden rounded-3xl p-6 bg-white/70 backdrop-blur-sm shadow-soft">
        <div className="absolute -top-6 left-6 float-slow">👒</div>
        <div className="absolute -top-4 right-10 float-slower delay-150">🕶️</div>
        <div className="absolute bottom-0 left-10 float-slower delay-300">🩴</div>
        <div className="absolute -bottom-3 right-8 float-slow">🏖️</div>

        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Elegant & Beachy – <span className="grad-text">leicht, luftig, fotogen</span>
          </h2>
          <p className="mt-2 text-slate-700 max-w-[900px]">
            Denkt an <b>Sommerstoffe</b> (Leinen, Chiffon), <b>helle Töne</b> (Sand, Türkis, Koralle) und
            <b> bequeme Schuhe</b> für den Sand. Wir feiern entspannt & stilvoll – bitte so kommen, wie ihr euch wohlfühlt.
          </p>

          {/* Farbswatches */}
          <div className="mt-4 flex flex-wrap gap-3">
            {SWATCHES.map(s => (
              <div key={s.name} className="swatch">
                <span className="swatch-dot" style={{ background: s.hex }} />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Moodboard */}
<section className="mt-6">
  <h3 className="text-lg font-semibold mb-2">Moodboard</h3>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {[...Array(16)].map((_, i) => (
      <img
        key={i}
        src={`/Stil-${i + 1}.jpg`}
        alt={`Beach Wedding Stil ${i + 1}`}
        onError={(e) => {
          e.currentTarget.src = '/assets/sunset-palm.jpg' // Fallback falls Bild fehlt
        }}
        className="w-full h-[230px] object-cover rounded-2xl shadow-soft hover:scale-[1.03] hover:rotate-[0.5deg] transition-transform duration-300 cursor-pointer"
      />
    ))}
  </div>
</section>



      {/* Tabs: Für Sie / Für Ihn / Unisex */}
      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          <button onClick={()=>setTab('uni')}
                  className={`tab ${tab==='uni'?'tab-active':''}`}>Unisex</button>
          <button onClick={()=>setTab('she')}
                  className={`tab ${tab==='she'?'tab-active':''}`}>Für Sie</button>
          <button onClick={()=>setTab('he')}
                  className={`tab ${tab==='he'?'tab-active':''}`}>Für Ihn</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {ideaList.map((it, i)=>(
            <div key={i} className="idea-card">
              <div className="text-3xl">{it.icon}</div>
              <div>
                <h4 className="font-semibold">{it.title}</h4>
                <p className="text-slate-600 text-sm">{it.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Do / Don't */}
      <section className="mt-8 grid md:grid-cols-2 gap-4">
        <Card title="Do ✅">
          <ul className="list-disc pl-6 space-y-1">
            <li>Leichte Stoffe (Leinen, Seide, Chiffon)</li>
            <li>Helle, sommerliche Farben (Sand, Koralle, Türkis)</li>
            <li>Bequeme Schuhe – flach oder Keil (sandfest)</li>
            <li>Accessoires: Sonnenhut, Sonnenbrille, zarter Schmuck</li>
            <li>Leichte Layer für später (Strick, Leinenblazer)</li>
            <li>Jeans und Hemd (Blazer / Anzug)</li>
          </ul>
        </Card>
        <Card title="Don't ❌">
          <ul className="list-disc pl-6 space-y-1">
            <li>Schwere Stoffe & dunkle Vollschwarz-Looks</li>
            <li>Hohe, spitze Absätze (im Sand schwierig)</li>
            <li>Große Taschen/Rucksäcke (stören beim Feiern)</li>
          </ul>
        </Card>
      </section>

      {/* Mini-FAQ */}
      <section className="mt-8 grid md:grid-cols-3 gap-4">
        <Card title="Barfuß erlaubt?">
          <p>Aber klar! Barfuß oder mit Sandalen – ganz wie ihr mögt.</p>
        </Card>
        <Card title="Farbwünsche?">
          <p>Gern sommerlich: Sand, Weiß, Türkis, Koralle. Hauptsache ihr fühlt euch wohl.</p>
        </Card>
        <Card title="Jacke/Überwurf?">
          <p>Abends kann’s kühler werden – leichter Überwurf/Blazer ist perfekt.</p>
        </Card>
      </section>
    </div>
  )
}
