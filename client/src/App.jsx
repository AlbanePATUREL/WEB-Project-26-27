import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Catalogue from './pages/Catalogue.jsx'
import QG from './pages/QG.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Catalogue />} />
          <Route path="/qg" element={<QG />} />
          <Route path="*" element={<div className="page etat"><p className="etat-titre">Page introuvable</p><Link to="/">Retour au catalogue</Link></div>} />
        </Routes>
      </main>
    </>
  )
}
