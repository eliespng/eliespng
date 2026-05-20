import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center fade-in">
      <h1 className="text-5xl md:text-7xl tracking-wide">elies.png</h1>
      <p className="mt-6 text-sm lowercase opacity-60 italic">fragments de vie</p>
      <Link to="/galerie" className="mt-16 text-sm lowercase tracking-widest opacity-60 hover:opacity-100">
        entrer
      </Link>
    </main>
  )
}
