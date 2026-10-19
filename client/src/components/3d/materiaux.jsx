// =========================================================
// materiaux.jsx — couleurs et matériaux réutilisés par tous les modèles 3D
// =========================================================
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, MathUtils } from 'three'

// Palette néon de la marque
export const NEON = {
  violet: '#7b3ff2',
  rose: '#ff2e9a',
  menthe: '#3ff5c3',
  or: '#ffc94d',
  argent: '#d8d4f0',
  nuit: '#22103f',
  laser: '#ff3b6b',
  flamme: '#ff8a3d',
  blanc: '#ffffff',
}

// Palette « désaturée » pour les gadgets indisponibles (en mission)
export const GRIS = {
  violet: '#6e6e76',
  rose: '#8c8c92',
  menthe: '#a0a0a6',
  or: '#a8a8a8',
  argent: '#c4c4c4',
  nuit: '#38383d',
  laser: '#7a7a7a',
  flamme: '#7a7a7a',
  blanc: '#d0d0d0',
}

// Métal poli (chrome, or…)
export function Metal({ couleur, rugosite = 0.22 }) {
  return <meshStandardMaterial color={couleur} metalness={0.95} roughness={rugosite} />
}

// Plastique laqué très brillant (vernis transparent par-dessus)
export function Brillant({ couleur, ...props }) {
  return (
    <meshPhysicalMaterial color={couleur} metalness={0.15} roughness={0.28} clearcoat={1} clearcoatRoughness={0.08} {...props} />
  )
}

// Verre coloré semi-transparent (flacons)
export function Verre({ couleur, opacite = 0.45 }) {
  return (
    <meshPhysicalMaterial color={couleur} metalness={0} roughness={0.05} clearcoat={1} transparent opacity={opacite} depthWrite={false} />
  )
}

// Matériau lumineux pour les effets (laser, flammes…) : additif, non affecté par l'éclairage
export function Lueur({ couleur, opacite = 1, ...props }) {
  return (
    <meshBasicMaterial color={couleur} transparent opacity={opacite} blending={AdditiveBlending} depthWrite={false} toneMapped={false} {...props} />
  )
}

/**
 * Renvoie une ref qui glisse doucement de 0 à 1 quand `actif` passe à true (et inversement).
 * Les modèles s'en servent pour animer leurs effets au survol sans à-coups.
 */
export function useProgression(actif, vitesse = 6) {
  const p = useRef(0)
  useFrame((_, delta) => {
    p.current = MathUtils.damp(p.current, actif ? 1 : 0, vitesse, delta)
  })
  return p
}
