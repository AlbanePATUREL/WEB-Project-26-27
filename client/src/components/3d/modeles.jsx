// =========================================================
// modeles.jsx — un modèle 3D procédural par gadget
// Chaque modèle est construit uniquement avec des formes de base de three.js
// (cylindres, sphères, tores, boîtes, extrusions…). Aucun fichier externe.
//
// Props communes :
//   actif : true quand la souris survole la carte → effet spécial
//   c     : la palette de couleurs (NEON, ou GRIS si le gadget est indisponible)
// =========================================================
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Sparkles } from '@react-three/drei'
import { DoubleSide, Shape } from 'three'
import { Brillant, Lueur, Metal, Verre, useProgression } from './materiaux.jsx'

const PI = Math.PI

// ---------------------------------------------------------
// 1. Compowder : poudrier-communicateur, l'écran s'ouvre et brille
// ---------------------------------------------------------
function Compowder({ actif, c }) {
  const p = useProgression(actif, 5)
  const couvercle = useRef()
  const ecran = useRef()

  useFrame((state) => {
    couvercle.current.rotation.x = -1.75 * p.current // ouverture du couvercle
    const scintillement = Math.sin(state.clock.elapsedTime * 9) * 0.3
    ecran.current.material.emissiveIntensity = 0.15 + p.current * (2.2 + scintillement)
  })

  // Clavier 3 x 3 de petits boutons
  const boutons = []
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      boutons.push(
        <mesh key={`${i}${j}`} position={[i * 0.22, 0.04, j * 0.22 + 0.1]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <Brillant couleur={(i + j) % 2 === 0 ? c.menthe : c.argent} />
        </mesh>
      )
    }
  }

  return (
    <group rotation={[0.6, 0, 0]} position={[0, -0.25, 0]} scale={0.95}>
      {/* Boîtier */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.24, 64]} />
        <Brillant couleur={c.rose} />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.045, 16, 64]} />
        <Metal couleur={c.or} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.02, 48]} />
        <meshStandardMaterial color={c.nuit} roughness={0.5} />
      </mesh>
      {boutons}

      {/* Couvercle articulé sur l'arrière (charnière en z = -0.9) */}
      <group ref={couvercle} position={[0, 0.02, -0.9]}>
        <group position={[0, 0.06, 0.9]}>
          <mesh>
            <cylinderGeometry args={[0.9, 0.9, 0.12, 64]} />
            <Brillant couleur={c.violet} />
          </mesh>
          {/* Emblème sur le dessus */}
          <mesh position={[0, 0.07, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.04, 12, 48]} />
            <Metal couleur={c.or} />
          </mesh>
          <mesh position={[0, 0.07, 0]} scale={[1, 0.35, 1]}>
            <sphereGeometry args={[0.17, 24, 16]} />
            <Brillant couleur={c.menthe} />
          </mesh>
          {/* Écran sous le couvercle : visible quand il s'ouvre */}
          <mesh ref={ecran} position={[0, -0.065, 0]} rotation={[PI / 2, 0, 0]}>
            <circleGeometry args={[0.74, 48]} />
            <meshStandardMaterial color={c.nuit} emissive={c.menthe} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// ---------------------------------------------------------
// 2. Rouge à lèvres laser : un faisceau sort de la pointe
// ---------------------------------------------------------
function RougeLaser({ actif, c }) {
  const p = useProgression(actif, 7)
  const faisceau = useRef()
  const lumiere = useRef()

  useFrame((state) => {
    const v = p.current
    const vibration = 1 + Math.sin(state.clock.elapsedTime * 40) * 0.08
    faisceau.current.scale.set(vibration, v, vibration)
    faisceau.current.visible = v > 0.02
    lumiere.current.intensity = v * 6
  })

  return (
    <group rotation={[0, 0, 0.35]} position={[0, -0.1, 0]}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.8, 48]} />
        <Metal couleur={c.or} />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.03, 12, 48]} />
        <Metal couleur={c.argent} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.35, 48]} />
        <Brillant couleur={c.rose} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 40]} />
        <Brillant couleur={c.laser} />
      </mesh>
      {/* Pointe biseautée */}
      <mesh position={[0, 0.62, 0]} rotation={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.07, 0.2, 0.25, 40]} />
        <Brillant couleur={c.laser} />
      </mesh>

      {/* Faisceau laser : le groupe grandit vers le haut depuis la pointe */}
      <group ref={faisceau} position={[0, 0.72, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 3, 12]} />
          <Lueur couleur={c.blanc} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 3, 16]} />
          <Lueur couleur={c.laser} opacite={0.45} />
        </mesh>
      </group>
      <pointLight ref={lumiere} position={[0, 0.9, 0.3]} color={c.laser} distance={4} />
    </group>
  )
}

// ---------------------------------------------------------
// 3. Sèche-cheveux grappin : le grappin est projeté avec son câble
// ---------------------------------------------------------
function SecheCheveuxGrappin({ actif, c }) {
  const p = useProgression(actif, 5)
  const grappin = useRef()
  const cable = useRef()
  const griffes = useRef()

  useFrame((_, delta) => {
    const sortie = p.current * 0.9
    grappin.current.position.x = 0.92 + sortie
    cable.current.scale.y = Math.max(sortie, 0.001)
    cable.current.position.x = 0.92 + sortie / 2
    griffes.current.rotation.x += delta * 8 * p.current
  })

  const listeGriffes = [0, 1, 2].map((i) => (
    <group key={i} rotation={[(i * 2 * PI) / 3, 0, 0]}>
      <mesh position={[0.12, 0.09, 0]} rotation={[0, 0, -PI / 2 + 0.7]}>
        <coneGeometry args={[0.04, 0.22, 10]} />
        <Metal couleur={c.argent} />
      </mesh>
    </group>
  ))

  return (
    <group position={[-0.25, 0.1, 0]} scale={0.95}>
      {/* Corps */}
      <mesh rotation={[0, 0, PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 1.1, 48]} />
        <Brillant couleur={c.violet} />
      </mesh>
      <mesh position={[-0.55, 0, 0]} scale={[0.45, 1, 1]}>
        <sphereGeometry args={[0.38, 32, 24]} />
        <Metal couleur={c.argent} />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0, PI / 2, 0]}>
        <torusGeometry args={[0.39, 0.04, 12, 48]} />
        <Metal couleur={c.or} />
      </mesh>
      {/* Embout (rétréci vers l'avant) */}
      <mesh position={[0.72, 0, 0]} rotation={[0, 0, -PI / 2]}>
        <cylinderGeometry args={[0.2, 0.3, 0.38, 40]} />
        <Metal couleur={c.argent} />
      </mesh>
      {/* Poignée + gâchette */}
      <mesh position={[-0.12, -0.55, 0]} rotation={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.14, 0.17, 0.85, 32]} />
        <Brillant couleur={c.rose} />
      </mesh>
      <mesh position={[0.02, -0.38, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.08, 0.16, 0.12]} />
        <Brillant couleur={c.menthe} />
      </mesh>

      {/* Câble (étiré selon la sortie du grappin) */}
      <mesh ref={cable} rotation={[0, 0, PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1, 8]} />
        <Metal couleur={c.or} />
      </mesh>
      {/* Grappin */}
      <group ref={grappin}>
        <mesh>
          <sphereGeometry args={[0.1, 20, 16]} />
          <Metal couleur={c.argent} />
        </mesh>
        <group ref={griffes}>{listeGriffes}</group>
      </group>
    </group>
  )
}

// ---------------------------------------------------------
// 4. Lunettes à rayons X : les verres s'allument et projettent un scan
// ---------------------------------------------------------
function LunettesRayonsX({ actif, c }) {
  const p = useProgression(actif)
  const verres = useRef([])
  const cones = useRef([])
  const ligne = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    verres.current.forEach((v) => (v.material.emissiveIntensity = 0.25 + p.current * 2.5))
    cones.current.forEach((cone) => {
      cone.material.opacity = p.current * 0.22
      cone.visible = p.current > 0.02
    })
    ligne.current.position.y = Math.sin(t * 4) * 0.28
    ligne.current.material.opacity = p.current
  })

  return (
    <group rotation={[0.1, -0.35, 0]} position={[0, 0.05, 0]}>
      {[-1, 1].map((cote, i) => (
        <group key={cote} position={[cote * 0.46, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.36, 0.07, 16, 48]} />
            <Brillant couleur={c.rose} />
          </mesh>
          <mesh ref={(el) => (verres.current[i] = el)}>
            <circleGeometry args={[0.34, 40]} />
            <meshStandardMaterial color={c.nuit} emissive={c.menthe} transparent opacity={0.85} toneMapped={false} />
          </mesh>
          {/* Cône de scan devant le verre */}
          <mesh ref={(el) => (cones.current[i] = el)} position={[0, 0, 0.8]} rotation={[-PI / 2, 0, 0]}>
            <coneGeometry args={[0.55, 1.6, 32, 1, true]} />
            <Lueur couleur={c.menthe} side={DoubleSide} />
          </mesh>
          {/* Charnière et branche */}
          <mesh position={[cote * 0.4, 0.06, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <Metal couleur={c.or} />
          </mesh>
          <mesh position={[cote * 0.42, 0.06, -0.55]}>
            <boxGeometry args={[0.05, 0.07, 1.1]} />
            <Metal couleur={c.violet} />
          </mesh>
        </group>
      ))}
      {/* Pont */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.11, 0.04, 12, 24, PI]} />
        <Metal couleur={c.or} />
      </mesh>
      {/* Ligne de balayage */}
      <mesh ref={ligne} position={[0, 0, 0.02]}>
        <boxGeometry args={[1.6, 0.02, 0.01]} />
        <Lueur couleur={c.menthe} />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------
// 5. Talons-propulseurs : semelle extrudée, le talon crache une flamme
// ---------------------------------------------------------
function TalonsPropulseurs({ actif, c }) {
  const p = useProgression(actif)
  const tout = useRef()
  const flamme = useRef()

  // Profil de la semelle (vu de côté) : de la pointe (gauche) au talon (droite)
  const semelle = useMemo(() => {
    const s = new Shape()
    s.moveTo(-0.95, -0.3)
    s.quadraticCurveTo(-0.6, -0.27, -0.35, -0.25)
    s.quadraticCurveTo(0.15, -0.18, 0.7, 0.32)
    s.lineTo(0.7, 0.22)
    s.quadraticCurveTo(0.15, -0.28, -0.35, -0.34)
    s.quadraticCurveTo(-0.7, -0.38, -0.95, -0.38)
    s.closePath()
    return s
  }, [])

  useFrame((state) => {
    const v = p.current
    const t = state.clock.elapsedTime
    tout.current.position.y = v * 0.25 + Math.sin(t * 30) * 0.01 * v
    flamme.current.scale.set(1, Math.max(v * (1 + Math.sin(t * 35) * 0.2), 0.001), 1)
    flamme.current.visible = v > 0.02
  })

  return (
    <group ref={tout}>
      <group rotation={[0, -0.5, 0]} position={[0, 0.1, 0]}>
        <mesh position={[0, 0, -0.19]}>
          <extrudeGeometry args={[semelle, { depth: 0.38, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3, curveSegments: 24 }]} />
          <Brillant couleur={c.violet} />
        </mesh>
        {/* Bout de la chaussure */}
        <mesh position={[-0.62, -0.22, 0]} scale={[0.42, 0.2, 0.24]}>
          <sphereGeometry args={[1, 32, 24]} />
          <Brillant couleur={c.rose} />
        </mesh>
        {/* Bride sur le cou-de-pied + pierre */}
        <mesh position={[0, -0.18, 0]} rotation={[0, PI / 2, 0]}>
          <torusGeometry args={[0.22, 0.035, 12, 32, PI]} />
          <Brillant couleur={c.rose} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <octahedronGeometry args={[0.07]} />
          <Brillant couleur={c.menthe} />
        </mesh>
        {/* Talon = propulseur */}
        <mesh position={[0.6, -0.1, 0]}>
          <cylinderGeometry args={[0.07, 0.05, 0.6, 20]} />
          <Metal couleur={c.argent} />
        </mesh>
        <mesh position={[0.6, -0.44, 0]}>
          <cylinderGeometry args={[0.06, 0.12, 0.12, 24]} />
          <Metal couleur={c.or} />
        </mesh>
        {/* Flamme (cônes pointant vers le bas) */}
        <group ref={flamme} position={[0.6, -0.5, 0]}>
          <mesh position={[0, -0.35, 0]} rotation={[PI, 0, 0]}>
            <coneGeometry args={[0.12, 0.7, 20]} />
            <Lueur couleur={c.flamme} opacite={0.8} />
          </mesh>
          <mesh position={[0, -0.22, 0]} rotation={[PI, 0, 0]}>
            <coneGeometry args={[0.06, 0.44, 16]} />
            <Lueur couleur={c.blanc} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// ---------------------------------------------------------
// 6. Bracelet lasso : un lasso lumineux se déploie en tournoyant
// ---------------------------------------------------------
function BraceletLasso({ actif, c }) {
  const p = useProgression(actif, 5)
  const lasso = useRef()

  useFrame((state, delta) => {
    const v = p.current
    lasso.current.visible = v > 0.02
    lasso.current.scale.setScalar(0.6 + v * 0.75)
    lasso.current.rotation.z += delta * 6 * v
    lasso.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.25
  })

  const pierres = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * PI * 2
    return (
      <mesh key={i} position={[Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.12]}>
        <sphereGeometry args={[0.065, 16, 12]} />
        <Brillant couleur={i % 2 ? c.rose : c.menthe} />
      </mesh>
    )
  })

  return (
    <group rotation={[0.9, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.62, 0.13, 24, 72]} />
        <Metal couleur={c.or} />
      </mesh>
      {pierres}
      {/* Corde enroulée sur le côté */}
      <mesh position={[0.62, 0, 0.12]} rotation={[0, 0, PI / 2]}>
        <torusKnotGeometry args={[0.12, 0.03, 64, 8, 2, 5]} />
        <Brillant couleur={c.rose} />
      </mesh>
      {/* Lasso */}
      <group ref={lasso}>
        <mesh>
          <torusGeometry args={[1.1, 0.025, 8, 96]} />
          <Lueur couleur={c.menthe} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.1, 0.07, 8, 96]} />
          <Lueur couleur={c.menthe} opacite={0.25} />
        </mesh>
      </group>
    </group>
  )
}

// ---------------------------------------------------------
// 7. Parfum soporifique : un nuage de brume s'échappe du vaporisateur
// ---------------------------------------------------------
function ParfumSoporifique({ actif, c }) {
  const p = useProgression(actif, 4)
  const poire = useRef()
  const nuage = useRef()

  useFrame((state) => {
    const v = p.current
    const t = state.clock.elapsedTime
    poire.current.scale.setScalar(1 - v * 0.15 * (0.5 + 0.5 * Math.sin(t * 10))) // on « presse » la poire
    nuage.current.visible = v > 0.02
    nuage.current.children.forEach((bulle, i) => {
      const phase = (t * 0.6 + i / 5) % 1
      bulle.position.set(-0.4 - phase * 1.1, 0.58 + Math.sin(phase * 4 + i) * 0.12, Math.cos(i * 2) * 0.15)
      bulle.scale.setScalar(0.1 + phase * 0.35)
      bulle.material.opacity = v * (1 - phase) * 0.35
    })
  })

  return (
    <group position={[0.1, -0.05, 0]}>
      {/* Flacon hexagonal + liquide */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.52, 0.58, 0.85, 6]} />
        <Verre couleur={c.violet} opacite={0.5} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 0.5, 6]} />
        <Brillant couleur={c.rose} emissive={c.rose} emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.52, 0.12, 6]} />
        <Verre couleur={c.violet} opacite={0.55} />
      </mesh>
      {/* Col et tête du vaporisateur */}
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 24]} />
        <Metal couleur={c.or} />
      </mesh>
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.22, 24]} />
        <Metal couleur={c.argent} />
      </mesh>
      <mesh position={[-0.17, 0.58, 0]} rotation={[0, 0, PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} />
        <Metal couleur={c.or} />
      </mesh>
      {/* Tuyau + poire */}
      <mesh position={[0.4, 0.44, 0]} rotation={[0, 0, -2.05]}>
        <cylinderGeometry args={[0.025, 0.025, 0.56, 8]} />
        <Brillant couleur={c.or} />
      </mesh>
      <mesh ref={poire} position={[0.72, 0.28, 0]}>
        <sphereGeometry args={[0.2, 24, 20]} />
        <Brillant couleur={c.rose} />
      </mesh>

      {/* Nuage de brume */}
      <group ref={nuage}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[1, 16, 12]} />
            <Lueur couleur={c.violet} opacite={0} />
          </mesh>
        ))}
      </group>
      {actif && <Sparkles count={30} position={[-0.9, 0.6, 0]} scale={[1.2, 0.6, 0.6]} size={3} speed={0.8} color={c.menthe} />}
    </group>
  )
}

// ---------------------------------------------------------
// 8. Sac à dos jetpack : les réacteurs s'allument et le sac décolle
// ---------------------------------------------------------
function Jetpack({ actif, c }) {
  const p = useProgression(actif, 4)
  const tout = useRef()
  const flammes = useRef([])

  useFrame((state) => {
    const v = p.current
    const t = state.clock.elapsedTime
    tout.current.position.y = v * 0.2
    flammes.current.forEach((f, i) => {
      f.scale.set(1, Math.max(v * (1 + Math.sin(t * 30 + i) * 0.2), 0.001), 1)
      f.visible = v > 0.02
    })
  })

  return (
    <group ref={tout} rotation={[0.1, 0.5, 0]} scale={0.85}>
      <RoundedBox args={[0.9, 1.1, 0.45]} radius={0.12} smoothness={4}>
        <Brillant couleur={c.violet} />
      </RoundedBox>
      <RoundedBox args={[0.6, 0.4, 0.12]} radius={0.05} position={[0, -0.22, 0.24]}>
        <Brillant couleur={c.rose} />
      </RoundedBox>
      <mesh position={[0, 0.25, 0.24]}>
        <torusGeometry args={[0.13, 0.03, 12, 32]} />
        <Lueur couleur={c.menthe} />
      </mesh>
      {/* Bretelles */}
      {[-1, 1].map((cote) => (
        <mesh key={cote} position={[cote * 0.36, 0, 0.25]}>
          <boxGeometry args={[0.1, 0.95, 0.04]} />
          <meshStandardMaterial color={c.nuit} roughness={0.7} />
        </mesh>
      ))}
      {/* Réacteurs */}
      {[-1, 1].map((cote, i) => (
        <group key={cote} position={[cote * 0.6, -0.05, -0.1]}>
          <mesh>
            <cylinderGeometry args={[0.17, 0.17, 0.9, 32]} />
            <Metal couleur={c.argent} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <sphereGeometry args={[0.17, 24, 16]} />
            <Metal couleur={c.or} />
          </mesh>
          <mesh position={[0, -0.15, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[0.175, 0.025, 8, 32]} />
            <Lueur couleur={c.menthe} />
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.12, 0.2, 0.2, 32]} />
            <Metal couleur={c.nuit} rugosite={0.4} />
          </mesh>
          <group ref={(el) => (flammes.current[i] = el)} position={[0, -0.65, 0]}>
            <mesh position={[0, -0.4, 0]} rotation={[PI, 0, 0]}>
              <coneGeometry args={[0.17, 0.8, 20]} />
              <Lueur couleur={c.flamme} opacite={0.8} />
            </mesh>
            <mesh position={[0, -0.25, 0]} rotation={[PI, 0, 0]}>
              <coneGeometry args={[0.08, 0.5, 16]} />
              <Lueur couleur={c.rose} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  )
}

// ---------------------------------------------------------
// 9. Boucles d'oreilles micro-espion : ondes radio qui s'échappent
// ---------------------------------------------------------
function BouclesMicroEspion({ actif, c }) {
  const p = useProgression(actif)
  const ondes = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ondes.current.forEach((onde, i) => {
      if (!onde) return
      const phase = (t * 0.9 + (i % 3) / 3) % 1
      onde.scale.setScalar(0.3 + phase * 1.4)
      onde.material.opacity = p.current * (1 - phase)
      onde.visible = p.current > 0.02
    })
  })

  return (
    <group position={[0, -0.05, 0]}>
      {[-1, 1].map((cote, b) => (
        <group key={cote} position={[cote * 0.45, cote * 0.08, 0]} rotation={[0, cote * 0.3, cote * -0.08]}>
          {/* Crochet + chaînette */}
          <mesh position={[0, 0.78, 0]} rotation={[0, 0, PI * 0.2]}>
            <torusGeometry args={[0.12, 0.02, 8, 24, PI * 1.3]} />
            <Metal couleur={c.or} />
          </mesh>
          {[0.62, 0.53, 0.44].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <Metal couleur={c.or} />
            </mesh>
          ))}
          {/* Pendentif-gemme serti */}
          <mesh position={[0, 0.12, 0]} scale={[1, 1.35, 1]}>
            <octahedronGeometry args={[0.24]} />
            <Brillant couleur={c.rose} flatShading />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <torusGeometry args={[0.2, 0.022, 8, 32]} />
            <Metal couleur={c.or} />
          </mesh>
          {/* Micro */}
          <mesh position={[0, 0.12, 0.15]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <Lueur couleur={c.menthe} />
          </mesh>
          {/* Ondes */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} ref={(el) => (ondes.current[b * 3 + i] = el)} position={[0, 0.12, 0.05]}>
              <torusGeometry args={[0.3, 0.012, 6, 48]} />
              <Lueur couleur={c.menthe} opacite={0} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

// ---------------------------------------------------------
// 10. Vernis à ongles acide : le bouchon se lève, l'acide bouillonne
// ---------------------------------------------------------
function VernisAcide({ actif, c }) {
  const p = useProgression(actif, 5)
  const bouchon = useRef()
  const bulles = useRef()

  useFrame((state) => {
    const v = p.current
    const t = state.clock.elapsedTime
    bouchon.current.position.y = 0.45 + v * 0.55
    bouchon.current.rotation.y = v * PI
    bulles.current.children.forEach((b, i) => {
      const phase = (t * 0.7 + i / 6) % 1
      b.position.y = -0.62 + phase * 0.45
      b.visible = v > 0.02
    })
  })

  return (
    <group position={[0, -0.05, 0]} rotation={[0.15, 0, 0]}>
      <RoundedBox args={[0.8, 0.7, 0.8]} radius={0.18} smoothness={4} position={[0, -0.38, 0]}>
        <Verre couleur={c.menthe} opacite={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.64, 0.48, 0.64]} radius={0.14} smoothness={4} position={[0, -0.47, 0]}>
        <meshStandardMaterial color={c.menthe} emissive={c.menthe} emissiveIntensity={0.45} roughness={0.2} />
      </RoundedBox>
      <group ref={bulles}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[Math.cos(i * 2.1) * 0.2, -0.6, Math.sin(i * 2.1) * 0.2]}>
            <sphereGeometry args={[0.04 + (i % 3) * 0.015, 12, 10]} />
            <Lueur couleur={c.blanc} opacite={0.7} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.12, 24]} />
        <Metal couleur={c.argent} />
      </mesh>
      {/* Bouchon + pinceau */}
      <group ref={bouchon}>
        <mesh>
          <cylinderGeometry args={[0.17, 0.2, 0.75, 32]} />
          <Brillant couleur={c.violet} />
        </mesh>
        <mesh position={[0, -0.36, 0]} rotation={[PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.03, 10, 32]} />
          <Metal couleur={c.or} />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
          <Metal couleur={c.argent} />
        </mesh>
        <mesh position={[0, -0.86, 0]} rotation={[PI, 0, 0]}>
          <coneGeometry args={[0.05, 0.14, 12]} />
          <Lueur couleur={c.menthe} />
        </mesh>
      </group>
      {actif && <Sparkles count={25} position={[0, 0.1, 0]} scale={[0.6, 0.8, 0.6]} size={3} speed={1.2} color={c.menthe} />}
    </group>
  )
}

// ---------------------------------------------------------
// 11. Gloss caméra : l'objectif s'allume, flash et voyant REC
// ---------------------------------------------------------
function GlossCamera({ actif, c }) {
  const p = useProgression(actif)
  const objectif = useRef()
  const rec = useRef()
  const flash = useRef()

  useFrame((state) => {
    const v = p.current
    const t = state.clock.elapsedTime
    objectif.current.material.opacity = v * (0.6 + Math.sin(t * 6) * 0.3)
    rec.current.material.opacity = v > 0.1 && Math.sin(t * 6) > 0 ? 1 : 0.15
    // Flash bref toutes les 1,5 s
    flash.current.intensity = v * ((t % 1.5) < 0.1 ? 25 : 0)
  })

  return (
    <group rotation={[0, -0.3, 0.12]} position={[0, -0.05, 0]}>
      {/* Tube transparent + gloss pailleté */}
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.95, 40]} />
        <Verre couleur={c.rose} opacite={0.4} />
      </mesh>
      <mesh position={[0, -0.43, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.8, 32]} />
        <Brillant couleur={c.rose} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Bouchon */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.65, 40]} />
        <Brillant couleur={c.violet} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[PI / 2, 0, 0]}>
        <torusGeometry args={[0.23, 0.03, 10, 40]} />
        <Metal couleur={c.or} />
      </mesh>
      {/* Caméra cachée */}
      <mesh position={[0, 0.5, 0.24]} rotation={[PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.1, 32]} />
        <Metal couleur={c.nuit} rugosite={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0.29]}>
        <torusGeometry args={[0.1, 0.02, 10, 32]} />
        <Metal couleur={c.or} />
      </mesh>
      <mesh position={[0, 0.5, 0.29]} scale={[1, 1, 0.5]}>
        <sphereGeometry args={[0.08, 24, 16]} />
        <meshPhysicalMaterial color="#05010c" metalness={0.3} roughness={0} clearcoat={1} />
      </mesh>
      <mesh ref={objectif} position={[0, 0.5, 0.33]}>
        <circleGeometry args={[0.16, 32]} />
        <Lueur couleur={c.menthe} opacite={0} />
      </mesh>
      <mesh ref={rec} position={[0.14, 0.68, 0.18]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <Lueur couleur={c.laser} opacite={0.15} />
      </mesh>
      <pointLight ref={flash} position={[0, 0.5, 0.8]} color={c.blanc} distance={3} />
    </group>
  )
}

// ---------------------------------------------------------
// 12. Ceinture boomerang : le boomerang se détache et tourne autour
// ---------------------------------------------------------
function CeintureBoomerang({ actif, c }) {
  const p = useProgression(actif, 4)
  const boomerang = useRef()
  const angle = useRef(-PI / 2 - 0.9) // position de repos sur le flanc gauche

  // Forme en V du boomerang
  const forme = useMemo(() => {
    const s = new Shape()
    s.moveTo(0, 0.1)
    s.lineTo(0.5, -0.2)
    s.quadraticCurveTo(0.58, -0.28, 0.48, -0.32)
    s.lineTo(0, -0.08)
    s.lineTo(-0.48, -0.32)
    s.quadraticCurveTo(-0.58, -0.28, -0.5, -0.2)
    s.closePath()
    return s
  }, [])

  useFrame((_, delta) => {
    const v = p.current
    angle.current += delta * 3.5 * v
    const rayon = 1.0 + v * 0.35
    boomerang.current.position.set(Math.cos(angle.current) * rayon, 0.1 + v * 0.2, Math.sin(angle.current) * rayon)
    boomerang.current.rotation.z += delta * 14 * v
  })

  const clous = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * PI * 2 + 0.3
    return (
      <mesh key={i} position={[Math.cos(a) * 0.81, 0, Math.sin(a) * 0.81]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <Lueur couleur={c.menthe} />
      </mesh>
    )
  })

  return (
    <group rotation={[0.45, 0, 0]} position={[0, -0.05, 0]}>
      {/* Bande de la ceinture (cylindre ouvert) */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 0.24, 72, 1, true]} />
        <Brillant couleur={c.violet} side={DoubleSide} />
      </mesh>
      {clous}
      {/* Boucle */}
      <RoundedBox args={[0.44, 0.32, 0.1]} radius={0.04} position={[0, 0, 0.83]}>
        <Metal couleur={c.or} />
      </RoundedBox>
      <RoundedBox args={[0.28, 0.16, 0.04]} radius={0.02} position={[0, 0, 0.89]}>
        <Brillant couleur={c.rose} />
      </RoundedBox>
      {/* Boomerang */}
      <group ref={boomerang}>
        <mesh rotation={[-PI / 2, 0, 0]} position={[0, 0, 0]}>
          <extrudeGeometry args={[forme, { depth: 0.05, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 }]} />
          <Brillant couleur={c.rose} />
        </mesh>
      </group>
    </group>
  )
}

// ---------------------------------------------------------
// Modèle par défaut : « gadget mystère » pour une clé inconnue
// ---------------------------------------------------------
function GadgetMystere({ actif, c }) {
  const p = useProgression(actif)
  const coeur = useRef()
  const cage = useRef()
  const anneau = useRef()

  useFrame((state, delta) => {
    const v = p.current
    coeur.current.scale.setScalar(1 + v * 0.15 * Math.sin(state.clock.elapsedTime * 8))
    cage.current.rotation.y -= delta * (0.3 + v * 3)
    cage.current.rotation.x += delta * (0.2 + v * 2)
    anneau.current.rotation.x += delta * (0.5 + v * 4)
  })

  return (
    <group>
      <mesh ref={coeur}>
        <icosahedronGeometry args={[0.55, 0]} />
        <Brillant couleur={c.violet} flatShading />
      </mesh>
      <mesh ref={cage}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color={c.menthe} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={anneau}>
        <torusGeometry args={[1.0, 0.025, 8, 64]} />
        <Metal couleur={c.or} />
      </mesh>
    </group>
  )
}

// Correspondance clé « visuel » (colonne de la base) → composant
export const MODELES = {
  compowder: Compowder,
  'lipstick-laser': RougeLaser,
  'hairdryer-grapple': SecheCheveuxGrappin,
  'xray-glasses': LunettesRayonsX,
  'rocket-heels': TalonsPropulseurs,
  'lasso-bracelet': BraceletLasso,
  'sleep-perfume': ParfumSoporifique,
  jetpack: Jetpack,
  'spy-earrings': BouclesMicroEspion,
  'acid-polish': VernisAcide,
  'lipgloss-camera': GlossCamera,
  'boomerang-belt': CeintureBoomerang,
}

export { GadgetMystere }
