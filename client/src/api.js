// =========================================================
// api.js — TOUS les appels HTTP du front passent par ici.
// Le front ne parle qu'à notre API Express, jamais à Supabase.
// =========================================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Fonction commune : envoie la requête et gère les erreurs
async function requete(chemin, options = {}) {
  let res
  try {
    res = await fetch(`${API_URL}${chemin}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    // fetch ne lève une erreur que si le serveur est injoignable
    throw new Error('Impossible de joindre le QG (serveur API injoignable).')
  }

  // 204 No Content (DELETE) : il n'y a PAS de corps, donc pas de res.json() !
  if (res.status === 204) return null

  const data = await res.json()
  if (!res.ok) {
    // Le serveur renvoie { erreur: "..." } pour les 400, 404 et 500
    throw new Error(data.erreur || `Erreur ${res.status}`)
  }
  return data
}

export function getGadgets() {
  return requete('/gadgets')
}

export function creerGadget(gadget) {
  return requete('/gadgets', { method: 'POST', body: JSON.stringify(gadget) })
}

export function modifierGadget(id, champs) {
  return requete(`/gadgets/${id}`, { method: 'PUT', body: JSON.stringify(champs) })
}

export function supprimerGadget(id) {
  return requete(`/gadgets/${id}`, { method: 'DELETE' })
}
