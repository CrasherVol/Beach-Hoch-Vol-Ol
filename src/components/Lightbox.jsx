export default function Lightbox({src, alt, onClose}){
  if(!src) return null
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <img className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-soft bg-white" src={src} alt={alt||'Bild'} />
    </div>
  )
}
