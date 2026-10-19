import { useState } from 'react'
import { useGadgets } from '../useGadgets.js'
import { CATEGORIES } from '../constantes.js'
import CarteGadget from '../components/CarteGadget.jsx'
import EtatChargement from '../components/EtatChargement.jsx'

// Page client : catalogue des gadgets avec recherche et filtres
export default function Catalogue() {
  const { gadgets, chargement, erreur, reveilLent, recharger } = useGadgets()
  const [recherche, setRecherche] = useState('')
  const [categorie, setCategorie] = useState('Toutes')
  const [dispoSeulement, setDispoSeulement] = useState(false)

  // Compteurs sur l'ensemble du stock
  const nbDispo = gadgets.filter((g) => g.disponible).length
  const nbMission = gadgets.length - nbDispo

  // On applique les 3 filtres les uns après les autres
  const gadgetsAffiches = gadgets
    .filter((g) => g.nom.toLowerCase().includes(recherche.trim().toLowerCase()))
    .filter((g) => categorie === 'Toutes' || g.categorie === categorie)
    .filter((g) => !dispoSeulement || g.disponible)

  return (
    <div className="page">
      <section className="hero">
        <p className="hero-surtitre">Catalogue officiel des agentes</p>
        <h1>L'équipement des meilleures espionnes</h1>
        {!chargement && !erreur && (
          <p className="compteur">
            <strong>{nbDispo}</strong> gadgets au QG · <strong>{nbMission}</strong> en mission
          </p>
        )}
      </section>

      <div className="filtres">
        <input
          type="search"
          className="champ"
          placeholder="Rechercher un gadget…"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          aria-label="Rechercher par nom"
        />
        <select
          className="champ"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          aria-label="Filtrer par catégorie"
        >
          <option value="Toutes">Toutes les catégories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="interrupteur">
          <input
            type="checkbox"
            checked={dispoSeulement}
            onChange={(e) => setDispoSeulement(e.target.checked)}
          />
          <span>Disponibles uniquement</span>
        </label>
      </div>

      <EtatChargement chargement={chargement} erreur={erreur} reveilLent={reveilLent} onReessayer={recharger} />

      {!chargement && !erreur && (
        <div className="grille">
          {gadgetsAffiches.map((g) => (
            <CarteGadget key={g.id} gadget={g} />
          ))}
          {gadgetsAffiches.length === 0 && <p className="vide">Aucun gadget ne correspond à ta recherche.</p>}
        </div>
      )}
    </div>
  )
}
