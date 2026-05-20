import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Gallery from './pages/Gallery.jsx'
import About from './pages/About.jsx'
import './index.css'

function Nav() {
  const link = ({ isActive }) =>
    `text-sm lowercase tracking-wide ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-8 py-6">
      <NavLink to="/" className="text-sm lowercase tracking-widest">elies.png</NavLink>
      <div className="flex gap-8">
        <NavLink to="/galerie" className={link}>galerie</NavLink>
        <NavLink to="/a-propos" className={link}>à propos</NavLink>
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="grain min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/galerie" element={<Gallery />} />
        <Route path="/a-propos" element={<About />} />
      </Routes>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
