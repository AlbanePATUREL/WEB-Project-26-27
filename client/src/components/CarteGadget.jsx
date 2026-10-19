import { useState } from 'react'
import { View } from '@react-three/drei'
import { formatPrix } from '../constantes.js'
import Gadget3D from './3d/Gadget3D.jsx'

// Une carte du catalogue : visuel + nom + catégorie + prix
export default function CarteGadget({ gadget }) {
  const [survol, setSurvol] = useState(false) // déclenche l'effet spécial du modèle 3D

  return (
    <article
      className={`carte ${gadget.disponible ? '' : 'carte-indispo'}`}
      onPointerEnter={() => setSurvol(true)}
      onPointerLeave={() => setSurvol(false)}
    >
      {/* La View réserve un rectangle dans la carte ; le modèle y est dessiné par le Canvas partagé */}
      <View className="carte-visuel">
        <Gadget3D visuel={gadget.visuel} actif={survol} desature={!gadget.disponible} />
      </View>
      {!gadget.disponible && <span className="badge-mission">En mission</span>}
      <div className="carte-infos">
        <span className="carte-categorie">{gadget.categorie}</span>
        <h3 className="carte-nom">{gadget.nom}</h3>
        <p className="carte-prix">{formatPrix(gadget.prix)}</p>
      </div>
    </article>
  )
}
