import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="marque">
        WOOHP <span>Store</span>
      </NavLink>
      <nav className="nav">
        <NavLink to="/" end>Catalogue</NavLink>
        <NavLink to="/qg">QG de Jerry</NavLink>
      </nav>
    </header>
  )
}
