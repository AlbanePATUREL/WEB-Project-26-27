import { useGadgets } from '../useGadgets.js'
import FormulaireAjout from '../components/FormulaireAjout.jsx'
import LigneGadget from '../components/LigneGadget.jsx'
import EtatChargement from '../components/EtatChargement.jsx'

// Page gérant : ajout, modification, disponibilité, suppression
export default function QG() {
  const { gadgets, setGadgets, chargement, erreur, reveilLent, recharger } = useGadgets()

  // On met à jour la liste locale avec la réponse du serveur (pas besoin de tout recharger)
  const ajouter = (nouveau) => setGadgets([...gadgets, nouveau])
  const remplacer = (modifie) => setGadgets(gadgets.map((g) => (g.id === modifie.id ? modifie : g)))
  const retirer = (id) => setGadgets(gadgets.filter((g) => g.id !== id))

  return (
    <div className="page">
      <section className="hero hero-qg">
        <div className="hero-texte">
          <p className="hero-surtitre">Accès réservé · Niveau 5</p>
          <h1>QG de Jerry</h1>
          <p className="hero-intro">Ajoute, modifie ou envoie en mission les gadgets du WOOHP Store.</p>
        </div>
      </section>

      <div className="qg">
        <FormulaireAjout onAjout={ajouter} />

        <section className="liste-gadgets">
          <h2>Arsenal ({gadgets.length})</h2>
          <EtatChargement chargement={chargement} erreur={erreur} reveilLent={reveilLent} onReessayer={recharger} />
          {!chargement && !erreur && (
            <ul>
              {gadgets.map((g) => (
                <LigneGadget key={g.id} gadget={g} onModif={remplacer} onSuppression={retirer} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
