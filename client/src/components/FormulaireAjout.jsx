import { useState } from 'react'
import { creerGadget } from '../api.js'
import { CATEGORIES, VISUELS } from '../constantes.js'
import { View } from '@react-three/drei'
import Gadget3D from './3d/Gadget3D.jsx'

// Valeurs du formulaire vide
const FORMULAIRE_VIDE = { nom: '', prix: '', categorie: 'Communication', visuel: 'compowder' }

// Formulaire CONTRÔLÉ : chaque champ affiche la valeur stockée dans le state
// et chaque frappe met à jour ce state via setFormulaire.
export default function FormulaireAjout({ onAjout }) {
  const [formulaire, setFormulaire] = useState(FORMULAIRE_VIDE)
  const [erreur, setErreur] = useState('')
  const [envoi, setEnvoi] = useState(false)

  // Un seul handler pour tous les champs : on utilise l'attribut "name"
  function handleChange(e) {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault() // empêche le rechargement de la page
    setErreur('')
    setEnvoi(true)
    try {
      // Pas de validation côté front : c'est le serveur qui décide (et renvoie 400 si besoin)
      const nouveau = await creerGadget(formulaire)
      onAjout(nouveau)
      setFormulaire(FORMULAIRE_VIDE)
    } catch (e) {
      setErreur(e.message) // ex : « Le nom du gadget est obligatoire. »
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <form className="formulaire" onSubmit={handleSubmit} noValidate>
      <h2>Nouveau gadget</h2>

      <label>
        Nom
        <input className="champ" name="nom" value={formulaire.nom} onChange={handleChange} placeholder="Ex : Stylo fumigène" />
      </label>

      <label>
        Prix (€)
        <input className="champ" name="prix" type="number" step="0.01" value={formulaire.prix} onChange={handleChange} placeholder="0,00" />
      </label>

      <label>
        Catégorie
        <select className="champ" name="categorie" value={formulaire.categorie} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Visuel 3D
        <select className="champ" name="visuel" value={formulaire.visuel} onChange={handleChange}>
          {VISUELS.map((v) => (
            <option key={v.cle} value={v.cle}>{v.label}</option>
          ))}
        </select>
      </label>

      {/* Aperçu 3D du visuel choisi (toujours animé) */}
      <View className="apercu">
        <Gadget3D visuel={formulaire.visuel} actif />
      </View>

      {erreur && <p className="message-erreur" role="alert">⚠ {erreur}</p>}

      <button className="btn btn-principal" type="submit" disabled={envoi}>
        {envoi ? 'Envoi au QG…' : 'Ajouter au catalogue'}
      </button>
    </form>
  )
}
