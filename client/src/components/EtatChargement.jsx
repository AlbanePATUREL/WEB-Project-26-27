// Affiche « Connexion au QG… » ou l'erreur, avec un bouton pour réessayer
export default function EtatChargement({ chargement, erreur, reveilLent, onReessayer }) {
  if (chargement) {
    return (
      <div className="etat">
        <div className="radar" aria-hidden="true" />
        <p className="etat-titre">Connexion au QG…</p>
        {reveilLent && (
          <p className="etat-detail">
            Le serveur sort de veille (hébergement gratuit), cela peut prendre jusqu'à une minute.
          </p>
        )}
      </div>
    )
  }
  if (erreur) {
    return (
      <div className="etat etat-erreur" role="alert">
        <p className="etat-titre">Transmission interrompue</p>
        <p className="etat-detail">{erreur}</p>
        <button className="btn btn-principal" onClick={onReessayer}>
          Réessayer
        </button>
      </div>
    )
  }
  return null
}
