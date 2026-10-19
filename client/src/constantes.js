// Listes partagées par les pages (la même liste de catégories existe côté serveur)
export const CATEGORIES = ['Communication', 'Attaque', 'Évasion', 'Infiltration', 'Beauté-Tech']

// Clés des modèles 3D disponibles (voir components/Gadget3D.jsx)
export const VISUELS = [
  { cle: 'compowder', label: 'Compowder' },
  { cle: 'lipstick-laser', label: 'Rouge à lèvres laser' },
  { cle: 'hairdryer-grapple', label: 'Sèche-cheveux grappin' },
  { cle: 'xray-glasses', label: 'Lunettes à rayons X' },
  { cle: 'rocket-heels', label: 'Talons-propulseurs' },
  { cle: 'lasso-bracelet', label: 'Bracelet lasso' },
  { cle: 'sleep-perfume', label: 'Parfum soporifique' },
  { cle: 'jetpack', label: 'Sac à dos jetpack' },
  { cle: 'spy-earrings', label: "Boucles d'oreilles micro-espion" },
  { cle: 'acid-polish', label: 'Vernis à ongles acide' },
  { cle: 'lipgloss-camera', label: 'Gloss caméra' },
  { cle: 'boomerang-belt', label: 'Ceinture boomerang' },
  { cle: 'mystere', label: 'Gadget mystère (par défaut)' },
]

// 129.9 -> "129,90 €"
export function formatPrix(prix) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
}
