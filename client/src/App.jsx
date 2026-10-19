import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Catalogue from './pages/Catalogue.jsx'
import QG from './pages/QG.jsx'
import ScenePartagee from './components/3d/ScenePartagee.jsx'

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
      {/* Un seul Canvas WebGL pour tous les modèles 3D du site */}
      <ScenePartagee />
      <footer className="footer">
        <p>WOOHP Store — l'équipement des meilleures espionnes.</p>
        <p className="footer-note">Projet étudiant ECE Paris · ING4 · Boutique fictive, visuels 100 % originaux.</p>
      </footer>
    </>
  )
}
