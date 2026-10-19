import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Header() {
  return (
    <header className="header">
      <div className="header-contenu">
        <NavLink to="/" className="marque" aria-label="WOOHP Store, accueil">
          <Logo />
          <span className="marque-texte">
            <span className="marque-nom">WOOHP</span>
            <span className="marque-store">Store</span>
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
