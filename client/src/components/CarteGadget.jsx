import { formatPrix } from '../constantes.js'

// Une carte du catalogue : visuel + nom + catégorie + prix
export default function CarteGadget({ gadget }) {
  return (
    <article className={`carte ${gadget.disponible ? '' : 'carte-indispo'}`}>
      <div className="carte-visuel" />
      {!gadget.disponible && <span className="badge-mission">En mission</span>}
      <div className="carte-infos">
        <span className="carte-categorie">{gadget.categorie}</span>
        <h3 className="carte-nom">{gadget.nom}</h3>
        <p className="carte-prix">{formatPrix(gadget.prix)}</p>
      </div>
    </article>
  )
}
