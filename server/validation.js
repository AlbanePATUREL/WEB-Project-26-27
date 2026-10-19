// =========================================================
// validation.js — règles de validation d'un gadget (POST et PUT)
// =========================================================

export const CATEGORIES = ['Communication', 'Attaque', 'Évasion', 'Infiltration', 'Beauté-Tech']

/**
 * Vérifie le corps d'une requête.
 * @param {object} body       le JSON envoyé par le front
 * @param {object} options    { partiel: true } pour le PUT (seuls les champs présents sont vérifiés)
 * @returns {{ erreur: string } | { donnees: object }}
 */
export function validerGadget(body, { partiel = false } = {}) {
  if (!body || typeof body !== 'object') {
    return { erreur: 'Le corps de la requête doit être un objet JSON.' }
  }

  const donnees = {} // uniquement les champs autorisés (on ignore le reste, ex : id)

  // --- nom : obligatoire en création, non vide ---
  if (!partiel || body.nom !== undefined) {
    if (typeof body.nom !== 'string' || body.nom.trim() === '') {
      return { erreur: 'Le nom du gadget est obligatoire.' }
    }
    donnees.nom = body.nom.trim()
  }

  // --- prix : obligatoire, numérique, >= 0 ---
  if (!partiel || body.prix !== undefined) {
    const prixValide =
      typeof body.prix === 'number' || (typeof body.prix === 'string' && body.prix.trim() !== '')
    const prix = Number(body.prix)
    if (!prixValide || Number.isNaN(prix)) {
      return { erreur: 'Le prix est obligatoire et doit être un nombre.' }
    }
    if (prix < 0) {
      return { erreur: 'Le prix ne peut pas être négatif.' }
    }
    donnees.prix = prix
  }

  // --- categorie : obligatoire, dans la liste ---
  if (!partiel || body.categorie !== undefined) {
    if (!CATEGORIES.includes(body.categorie)) {
      return { erreur: `Catégorie invalide. Choix possibles : ${CATEGORIES.join(', ')}.` }
    }
    donnees.categorie = body.categorie
  }

  // --- visuel : facultatif, texte ---
  if (body.visuel !== undefined) {
    if (typeof body.visuel !== 'string') {
      return { erreur: 'Le visuel doit être un texte (clé du modèle 3D).' }
    }
    donnees.visuel = body.visuel
  }

  // --- disponible : facultatif, booléen ---
  if (body.disponible !== undefined) {
    if (typeof body.disponible !== 'boolean') {
      return { erreur: 'Le champ disponible doit valoir true ou false.' }
    }
    donnees.disponible = body.disponible
  }

  if (partiel && Object.keys(donnees).length === 0) {
    return { erreur: 'Aucun champ à modifier.' }
  }

  return { donnees }
}
