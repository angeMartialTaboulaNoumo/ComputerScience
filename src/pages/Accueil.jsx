//import React, { useState, useEffect } from 'react';
//import '../assets/styles/styleAccueil.css';
import React, { useState, useEffect } from 'react';
import '../assets/styles/styleAccueil.css';

const AccueilPage = () => {
  const [userScore, setUserScore] = useState(45);
  const [userName] = useState('Tech-Responsable');
  const [activeNav, setActiveNav] = useState('accueil');
  const [ranking, setRanking] = useState([]);

  // Données de classement
  const initialRanking = [
    { id: 1, name: "Écolo-Tech", score: 12, avatar: "🌱", progress: 8, level: "Expert Vert" },
    { id: 2, name: "Vert-Numérique", score: 18, avatar: "🌍", progress: 12, level: "Expert Vert" },
    { id: 3, name: "Libre-Connecté", score: 22, avatar: "🕊️", progress: 5, level: "Avancé" },
    { id: 4, name: "Tech-Responsable", score: 28, avatar: "💚", progress: 15, level: "Avancé" },
    { id: 5, name: "Vous", score: 45, avatar: "👤", progress: 10, level: "Intermédiaire" },
    { id: 6, name: "Débutant-Éthique", score: 58, avatar: "🌿", progress: -3, level: "Débutant" },
    { id: 7, name: "Transition-En-Cours", score: 67, avatar: "🔄", progress: -8, level: "Débutant" },
    { id: 8, name: "Consomm-Tech", score: 82, avatar: "📱", progress: -12, level: "Dépendant" },
    { id: 9, name: "Giga-Dépendant", score: 91, avatar: "🔌", progress: -5, level: "Dépendant" },
    { id: 10, name: "Cloud-Addict", score: 96, avatar: "☁️", progress: -15, level: "Très Dépendant" }
  ];

  // Statistiques d'impact
  const impactStats = [
    { icon: "🌳", value: "1,234", label: "Arbres plantés par la communauté" },
    { icon: "⚡", value: "45,678", label: "kWh d'énergie économisée" },
    { icon: "📉", value: "89%", label: "de réduction des données collectées" },
    { icon: "👥", value: "5,432", label: "Membres actifs dans la transition" }
  ];

  // Alternatives populaires
  const popularAlternatives = [
    { name: "Ecosia", category: "Moteur de recherche", users: "2.1k", icon: "🔍" },
    { name: "Signal", category: "Messagerie", users: "1.8k", icon: "💬" },
    { name: "Nextcloud", category: "Cloud", users: "1.5k", icon: "☁️" },
    { name: "ProtonMail", category: "Email", users: "1.3k", icon: "📧" }
  ];

  useEffect(() => {
    // Trier le classement par score (du plus bas au plus élevé)
    const sortedRanking = [...initialRanking].sort((a, b) => a.score - b.score);
    setRanking(sortedRanking);
  }, []);

  const getScoreColor = (score) => {
    if (score < 20) return '#2ecc71'; // Vert
    if (score < 40) return '#3498db'; // Bleu
    if (score < 60) return '#f39c12'; // Orange
    if (score < 80) return '#e74c3c'; // Rouge
    return '#8e44ad'; // Violet pour très élevé
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert Vert': return '#27ae60';
      case 'Avancé': return '#2ecc71';
      case 'Intermédiaire': return '#f1c40f';
      case 'Débutant': return '#e67e22';
      case 'Dépendant': return '#e74c3c';
      case 'Très Dépendant': return '#8e44ad';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="accueil-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="logo">
              <span className="logo-icon">🌿</span>
              <span className="logo-text">Transition Verte</span>
            </div>
          </div>
          
          <div className="navbar-menu">
            <button 
              className={`nav-link ${activeNav === 'accueil' ? 'active' : ''}`}
              onClick={() => setActiveNav('accueil')}
            >
              🏠 Accueil
            </button>
            <button 
              className={`nav-link ${activeNav === 'classement' ? 'active' : ''}`}
              onClick={() => setActiveNav('classement')}
            >
              🏆 Classement
            </button>
            <button 
              className={`nav-link ${activeNav === 'alternatives' ? 'active' : ''}`}
              onClick={() => setActiveNav('alternatives')}
            >
              🔄 Alternatives
            </button>
            <button 
              className={`nav-link ${activeNav === 'jeux' ? 'active' : ''}`}
              onClick={() => setActiveNav('jeux')}
            >
              🎮 Jeux éducatifs
            </button>
            <button 
              className={`nav-link ${activeNav === 'ressources' ? 'active' : ''}`}
              onClick={() => setActiveNav('ressources')}
            >
              📚 Ressources
            </button>
          </div>
          
          <div className="navbar-user">
            <div className="user-score-display">
              <span className="score-label">Votre score:</span>
              <span 
                className="score-value" 
                style={{ color: getScoreColor(userScore) }}
              >
                {userScore}
              </span>
            </div>
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </nav>

      {/* Section d'accueil avec image et message */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-icon">🌍</span>
                Libérez-vous des Big Tech
                <span className="hero-icon">🌱</span>
              </h1>
              <h2 className="hero-subtitle">
                Rejoignez le mouvement pour une transition numérique éthique et écologique
              </h2>
              <p className="hero-description">
                Découvrez des alternatives respectueuses de votre vie privée et de notre planète. 
                Évaluez votre dépendance, comparez-vous à la communauté et apprenez à réduire 
                votre empreinte numérique tout en conservant votre productivité.
              </p>
              
              <div className="hero-actions">
                <button className="btn-primary">
                  📝 Évaluer ma dépendance
                </button>
                <button className="btn-secondary">
                  🔍 Découvrir les alternatives
                </button>
              </div>
            </div>
            
            <div className="hero-image-container">
              <div className="hero-image-placeholder">
                <div className="image-content">
                  <div className="earth-icon">🌍</div>
                  <div className="digital-tree">🌳</div>
                  <div className="data-lock">🔒</div>
                  <div className="leaf-network">🍃</div>
                  <div className="cloud-alt">☁️</div>
                </div>
                <div className="image-caption">
                  Illustration: Transition vers un numérique plus vert et éthique
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques d'impact */}
      <section className="stats-section">
        <div className="section-header">
          <h2>📊 Impact collectif de notre communauté</h2>
          <p>Chaque petit geste compte dans la transition vers un numérique plus responsable</p>
        </div>
        
        <div className="stats-grid">
          {impactStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Classement */}
      <section className="ranking-section">
        <div className="section-header">
          <h2>🏆 Classement de la communauté</h2>
          <p>Comparez votre score avec les autres membres et progressez vers un numérique plus vert</p>
        </div>
        
        <div className="ranking-container">
          <div className="ranking-header">
            <div className="ranking-column rank">Position</div>
            <div className="ranking-column user">Utilisateur</div>
            <div className="ranking-column score">Score</div>
            <div className="ranking-column progress">Progression</div>
            <div className="ranking-column level">Niveau</div>
          </div>
          
          <div className="ranking-list">
            {ranking.map((user, index) => (
              <div 
                key={user.id} 
                className={`ranking-row ${user.name === 'Vous' ? 'current-user' : ''}`}
              >
                <div className="ranking-column rank">
                  <span className={`rank-number ${index < 3 ? 'top-rank' : ''}`}>
                    #{index + 1}
                  </span>
                  {index < 3 && (
                    <span className="rank-trophy">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                  )}
                </div>
                
                <div className="ranking-column user">
                  <div className="user-info">
                    <span className="user-avatar">{user.avatar}</span>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      {user.name === 'Vous' && (
                        <span className="you-badge">(Vous)</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="ranking-column score">
                  <div className="score-container">
                    <div 
                      className="score-bar-bg"
                      style={{ backgroundColor: `${getScoreColor(user.score)}20` }}
                    >
                      <div 
                        className="score-bar-fill"
                        style={{
                          width: `${user.score}%`,
                          backgroundColor: getScoreColor(user.score)
                        }}
                      ></div>
                    </div>
                    <span 
                      className="score-value"
                      style={{ color: getScoreColor(user.score) }}
                    >
                      {user.score}/100
                    </span>
                  </div>
                </div>
                
                <div className="ranking-column progress">
                  <div className={`progress-indicator ${user.progress >= 0 ? 'positive' : 'negative'}`}>
                    {user.progress >= 0 ? '↗' : '↘'} {Math.abs(user.progress)} pts
                  </div>
                </div>
                
                <div className="ranking-column level">
                  <span 
                    className="level-badge"
                    style={{ backgroundColor: getLevelColor(user.level) }}
                  >
                    {user.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="ranking-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div>
            <span>Score bas = faible dépendance</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f1c40f' }}></div>
            <span>Score moyen = dépendance modérée</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#e74c3c' }}></div>
            <span>Score élevé = forte dépendance</span>
          </div>
        </div>
      </section>

      {/* Alternatives populaires */}
      <section className="alternatives-section">
        <div className="section-header">
          <h2>🔄 Alternatives populaires dans la communauté</h2>
          <p>Découvrez les services éthiques préférés de nos membres</p>
        </div>
        
        <div className="alternatives-grid">
          {popularAlternatives.map((alt, index) => (
            <div key={index} className="alternative-card">
              <div className="alternative-icon">{alt.icon}</div>
              <h3 className="alternative-name">{alt.name}</h3>
              <p className="alternative-category">{alt.category}</p>
              <div className="alternative-users">
                <span className="users-count">{alt.users}</span> utilisateurs
              </div>
              <button className="btn-alternative">
                Découvrir →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à réduire votre dépendance aux Big Tech?</h2>
          <p>Commencez votre transition numérique verte dès aujourd'hui</p>
          <div className="cta-actions">
            <button className="btn-cta-primary">
              🚀 Commencer l'évaluation
            </button>
            <button className="btn-cta-secondary">
              📚 Voir le guide complet
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default AccueilPage;