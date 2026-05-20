import { useState, useEffect, useCallback } from 'react'
import { photos } from '../data/photos.js'

export default function Gallery() {
  const [index, setIndex] = useState(null)
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

  const blockSave = (e) => e.preventDefault()

  return (
    <main className="pt-28 pb-16 px-6 md:px-12 fade-in" onContextMenu={blockSave}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => open(i)}
            className="group relative aspect-[4/5] overflow-hidden photo"
            aria-label={p.title}
          >
            <div
              className="absolute inset-0 bg-center bg-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url(${p.src})` }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-4">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm lowercase italic">{p.title}</p>
                <p className="text-xs lowercase opacity-60">{p.date}</p>
              </div>
            </div>
            <div className="absolute inset-0" />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center fade-in"
          onClick={close}
          onContextMenu={blockSave}
        >
          <div
            className="absolute inset-0 bg-center bg-contain bg-no-repeat photo"
            style={{ backgroundImage: `url(${photos[index].src})` }}
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
