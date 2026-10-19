import { useState } from 'react'
import { modifierGadget, supprimerGadget } from '../api.js'
import { CATEGORIES, formatPrix } from '../constantes.js'

// Une ligne de la liste du QG : dispo / modifier / supprimer
export default function LigneGadget({ gadget, onModif, onSuppression }) {
  const [mode, setMode] = useState('normal') // 'normal' | 'edition' | 'confirmation'
  const [edition, setEdition] = useState({ nom: gadget.nom, prix: gadget.prix, categorie: gadget.categorie })
  const [erreur, setErreur] = useState('')
  const [occupe, setOccupe] = useState(false)

  // Appelle l'API puis prévient la page parente ; affiche l'erreur sinon
  async function action(fonction) {
    setErreur('')
    setOccupe(true)
    try {
      await fonction()
    } catch (e) {
      setErreur(e.message)
    } finally {
      setOccupe(false)
    }
  }

  const basculerDispo = () =>
    action(async () => onModif(await modifierGadget(gadget.id, { disponible: !gadget.disponible })))

  const enregistrer = () =>
    action(async () => {
      onModif(await modifierGadget(gadget.id, edition))
      setMode('normal')
    })

  const supprimer = () =>
    action(async () => {
      await supprimerGadget(gadget.id) // 204 : rien à lire
      onSuppression(gadget.id)
    })

  function ouvrirEdition() {
    setEdition({ nom: gadget.nom, prix: gadget.prix, categorie: gadget.categorie })
    setMode('edition')
  }

  return (
    <li className={`ligne ${gadget.disponible ? '' : 'ligne-indispo'}`}>
      {mode === 'edition' ? (
        <div className="ligne-edition">
          <input className="champ" value={edition.nom} onChange={(e) => setEdition({ ...edition, nom: e.target.value })} aria-label="Nom" />
          <input className="champ" type="number" step="0.01" value={edition.prix} onChange={(e) => setEdition({ ...edition, prix: e.target.value })} aria-label="Prix" />
          <select className="champ" value={edition.categorie} onChange={(e) => setEdition({ ...edition, categorie: e.target.value })} aria-label="Catégorie">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="ligne-infos">
          <strong>{gadget.nom}</strong>
          <span>{gadget.categorie} · {formatPrix(gadget.prix)}</span>
        </div>
      )}

      <div className="ligne-actions">
        {mode === 'normal' && (
          <>
            <button className={`btn-dispo ${gadget.disponible ? 'oui' : 'non'}`} onClick={basculerDispo} disabled={occupe}>
              {gadget.disponible ? 'Disponible' : 'En mission'}
            </button>
            <button className="btn btn-secondaire" onClick={ouvrirEdition}>Modifier</button>
            <button className="btn btn-danger" onClick={() => setMode('confirmation')}>Supprimer</button>
          </>
        )}
        {mode === 'edition' && (
          <>
            <button className="btn btn-principal" onClick={enregistrer} disabled={occupe}>Enregistrer</button>
            <button className="btn btn-secondaire" onClick={() => { setMode('normal'); setErreur('') }}>Annuler</button>
          </>
        )}
        {mode === 'confirmation' && (
          <>
            <span className="confirmation">Supprimer définitivement ?</span>
            <button className="btn btn-danger" onClick={supprimer} disabled={occupe}>Oui, supprimer</button>
            <button className="btn btn-secondaire" onClick={() => setMode('normal')}>Non</button>
          </>
        )}
      </div>

      {erreur && <p className="message-erreur" role="alert">⚠ {erreur}</p>}
    </li>
  )
}
