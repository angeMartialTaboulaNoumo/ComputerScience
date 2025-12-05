import '../assets/styles/footer.css'
export default function Footer(){
    return (
      <footer className="page-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">🌿</span>
              <span className="logo-text">Transition Verte</span>
            </div>
            <p className="footer-tagline">
              Vers un numérique éthique, écologique et indépendant
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <a href="#">Accueil</a>
              <a href="#">Classement</a>
              <a href="#">Alternatives</a>
              <a href="#">Jeux éducatifs</a>
            </div>
            
            <div className="footer-column">
              <h4>Ressources</h4>
              <a href="#">Guides pratiques</a>
              <a href="#">Études de cas</a>
              <a href="#">Outils d'évaluation</a>
              <a href="#">Blog</a>
            </div>
            
            <div className="footer-column">
              <h4>Communauté</h4>
              <a href="#">Forum</a>
              <a href="#">Événements</a>
              <a href="#">Témoignages</a>
              <a href="#">Devenir ambassadeur</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Transition Verte. Tous droits réservés.</p>
          <p>🌍 Ensemble pour un numérique plus responsable</p>
        </div>
      </footer>
    );
}