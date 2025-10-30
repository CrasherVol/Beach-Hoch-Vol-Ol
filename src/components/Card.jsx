export default function Card({title, children}){
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl3 p-5 shadow-soft">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  )
}
