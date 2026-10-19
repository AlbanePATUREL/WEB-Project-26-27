// Hook personnalisé : charge la liste des gadgets depuis l'API
// (utilisé par le Catalogue ET par le QG pour ne pas dupliquer le code)
import { useEffect, useState } from 'react'
import { getGadgets } from './api.js'

export function useGadgets() {
  const [gadgets, setGadgets] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')
  const [reveilLent, setReveilLent] = useState(false) // Render gratuit met ~50 s à se réveiller

  async function charger() {
    setChargement(true)
    setErreur('')
    setReveilLent(false)
    // Si la réponse tarde, on prévient que le serveur se réveille
    const minuteur = setTimeout(() => setReveilLent(true), 3000)
    try {
      setGadgets(await getGadgets())
    } catch (e) {
      setErreur(e.message)
    } finally {
      clearTimeout(minuteur)
      setChargement(false)
    }
  }

  useEffect(() => {
    charger()
  }, [])

  return { gadgets, setGadgets, chargement, erreur, reveilLent, recharger: charger }
}
