import { useState, useEffect, useCallback, useRef } from 'react'
import { photos } from '../data/photos.js'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const [loaded, setLoaded] = useState({})
  const open = (i) => setIndex(i)
  const close = () => setIndex(null)
  const prev = useCallback(() => setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)), [])
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % photos.length)), [])

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, prev, next])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [index])

  const blockSave = (e) => e.preventDefault()

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <main className="pt-28 pb-16 px-6 md:px-12 fade-in" onContextMenu={blockSave}>
      {/* Masonry layout with CSS columns */}
      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => open(i)}
            className="group relative w-full break-inside-avoid overflow-hidden photo block"
            aria-label={p.title}
          >
            <img
              src={p.src}
              alt={p.title}
              loading="lazy"
              onLoad={() => handleImageLoad(p.id)}
              className={`w-full h-auto block transition-all duration-700 ease-in-out group-hover:scale-105 ${
                loaded[p.id] ? 'opacity-100' : 'opacity-0'
              }`}
              draggable="false"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-4">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm lowercase italic">{p.title}</p>
                <p className="text-xs lowercase opacity-60">{p.date}</p>
              </div>
            </div>
            {/* Invisible overlay to block right-click save */}
            <div className="absolute inset-0" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center fade-in"
          onClick={close}
          onContextMenu={blockSave}
        >
          <img
            src={photos[index].src}
            alt={photos[index].title}
            className="max-h-[85vh] max-w-[90vw] object-contain photo"
            draggable="false"
          />
          <div className="absolute inset-0" />
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-sm lowercase opacity-60 hover:opacity-100 z-10"
          >← précédent</button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-sm lowercase opacity-60 hover:opacity-100 z-10"
          >suivant →</button>
          <button
            onClick={close}
            className="absolute top-6 right-8 text-sm lowercase opacity-60 hover:opacity-100 z-10"
          >fermer</button>
          <div className="absolute bottom-6 left-0 right-0 text-center z-10">
            <p className="text-sm lowercase italic">{photos[index].title}</p>
            <p className="text-xs lowercase opacity-60">{photos[index].date}</p>
          </div>
        </div>
      )}
    </main>
  )
}
