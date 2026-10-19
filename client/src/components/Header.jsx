import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Header() {
  return (
    <header className="header">
      <div className="header-contenu">
        <NavLink to="/" className="marque" aria-label="Beverly Gadgets, accueil">
          <Logo />
          <span className="marque-texte">
            <span className="marque-nom">Beverly</span>
            <span className="marque-store">Gadgets</span>
          </span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Catalogue</NavLink>
          <NavLink to="/qg">QG de Jerry</NavLink>
        </nav>
      </div>
    </header>
  )
}
