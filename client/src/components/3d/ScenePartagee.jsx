// =========================================================
// ScenePartagee.jsx — LE SEUL <Canvas> WebGL de tout le site.
//
// Pourquoi ? Un navigateur limite le nombre de contextes WebGL (~16).
// Avec un Canvas par carte, au-delà de 16 gadgets les premiers modèles
// disparaîtraient. Ici, un seul Canvas transparent recouvre la page et
// chaque carte déclare une <View> : drei dessine chaque scène uniquement
// dans le rectangle de sa View (technique du « scissor »).
// Les Views hors de l'écran ne sont pas dessinées du tout.
// =========================================================
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, View } from '@react-three/drei'

export default function ScenePartagee() {
  // Résolution adaptative : on baisse la netteté si la machine rame
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      className="scene-partagee"
      // Fixé sur toute la fenêtre, transparent, et les clics le traversent
      style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}
      // frameloop "always" : les modèles sont animés en continu (rotation, flottement)
      frameloop="always"
      // dpr limité : jamais plus de 1,5 pixel réel par pixel CSS (écrans Retina = 2 ou 3)
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
      {/* Chaque <View> déclarée dans la page vient se dessiner ici */}
      <View.Port />
    </Canvas>
  )
}
