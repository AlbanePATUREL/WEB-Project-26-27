// =========================================================
// Gadget3D.jsx — met en scène le modèle 3D correspondant à la clé `visuel`
// (caméra + éclairage + flottement + rotation + ombre au sol)
// Ce composant est TOUJOURS placé dans une <View> de drei (voir CarteGadget.jsx).
// =========================================================
import { Component, Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, PerspectiveCamera } from '@react-three/drei'
import { MathUtils } from 'three'
import { MODELES, GadgetMystere } from './modeles.jsx'
import { GRIS, NEON } from './materiaux.jsx'

// Rotation continue : lente au repos, rapide au survol, arrêtée si indisponible
function Pivot({ actif, fige, children }) {
  const groupe = useRef()
  const vitesse = useRef(0.5)

  useFrame((_, delta) => {
    if (fige) return
    vitesse.current = MathUtils.damp(vitesse.current, actif ? 2.6 : 0.5, 4, delta)
    groupe.current.rotation.y += delta * vitesse.current
  })

  return (
    <group ref={groupe} rotation={[0, -0.4, 0]}>
      {children}
    </group>
  )
}

// Si l'environnement HDR (téléchargé par drei) ne charge pas — ex : pas d'internet
// le jour de l'oral — on bascule sur un éclairage de studio 100 % local.
class SecoursEnvironnement extends Component {
  state = { erreur: false }
  static getDerivedStateFromError() {
    return { erreur: true }
  }
  render() {
    if (this.state.erreur) {
      return (
        <Environment resolution={64}>
          <Lightformer intensity={2} position={[0, 3, 3]} scale={[6, 2, 1]} />
          <Lightformer intensity={1.5} color="#ff2e9a" position={[-4, 0, 1]} scale={[2, 4, 1]} />
          <Lightformer intensity={1.5} color="#3ff5c3" position={[4, 0, 1]} scale={[2, 4, 1]} />
        </Environment>
      )
    }
    return this.props.children
  }
}

export default function Gadget3D({ visuel, actif = false, desature = false }) {
  // Clé inconnue → modèle par défaut
  const Modele = MODELES[visuel] || GadgetMystere
  const couleurs = desature ? GRIS : NEON
  const effet = actif && !desature // pas d'effet spécial pour un gadget en mission

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.35, 4.6]} fov={35} />

      {/* Éclairage : reflets de l'environnement + lumières colorées de la marque */}
      <SecoursEnvironnement>
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={desature ? 0.5 : 0.8} />
        </Suspense>
      </SecoursEnvironnement>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-3, 1.5, 2]} intensity={desature ? 0 : 14} color={NEON.rose} />
      <pointLight position={[3, -0.5, 2]} intensity={desature ? 0 : 10} color={NEON.menthe} />

      <Float speed={desature ? 0 : 2} rotationIntensity={desature ? 0 : 0.25} floatIntensity={desature ? 0 : 0.5}>
        <Pivot actif={effet} fige={desature}>
          <Modele actif={effet} c={couleurs} />
        </Pivot>
      </Float>

      <ContactShadows position={[0, -1.15, 0]} opacity={0.55} scale={4} blur={2.4} far={2.5} resolution={256} color="#12002e" />
    </>
  )
}
