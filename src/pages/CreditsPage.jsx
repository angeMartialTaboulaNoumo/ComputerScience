import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Code, Linkedin, Github, MapPin } from 'lucide-react';
import '../assets/styles/CreditsPage.css';
import '../assets/styles/MatrixBackground.css';
import Navbar from '../components/Navbar';

const CreditsPage = () => {
  const [expandedMember, setExpandedMember] = useState(null);

  // Données de l'équipe
  const teamMembers = [
    {
      id: 1,
      name: "  Ange NOUMO TABOULA",
      role: "DATA/DEV",
      avatar: "AT ",
      color: "#00ff55",
      info: {
        email: "martialtaboula@gmail.com",
        technologies: "sklearn, Python,TensorFlow,Keras, matpmlotlib, pandas, numpy, Node.js, MongoDB",
        location: "France",
        github: "angeMartialTaboulaNoumo",
        linkedin: "martial-taboula-b69a9b33a"
      }
    },
    {
      id: 2,
      name: "Franck TCHANME",
      role: "AI engineer",
      avatar: "FT",
      color: "#00dd44",
      info: {
        email: "tchanmerayan@gmail.com",
        technologies: "TensorFlow, PyTorch, OpenCV, NLP, Python, R",
        location: "France",
       
        linkedin: "rayan-franck-tchanme"
      }
    },
    {
      id: 3,
      name: "Andy KENMEGNE",
      role: "Developpeur Java & Mobile/IA integrateur",
      avatar: "AK",
      color: "#00cc33",
      info: {
        email: "bryankenmegne6@gmail.com",
        technologies: "Java, PostgreSQL, Dart, Flutter, Supabase",
        location: "France",
        github: "bryankenmegne",
        linkedin: "bryan-kenmegne-899923340 "
      }
    },
    {
      id: 4,
      name: "Brel NOSSE",
      role: "Developpeur Frontend",
      avatar: "BN",
      color: "#00bb22",
      info: {
        email: "brelnosse2@gmail.com",
        technologies: "react, NOde.js,Figma, Mongodb, CSS, HTML",
        location: "France",
        github: "brelnosse",
        linkedin: "brel-nosse-88a3a2377/",
      }
    },
    {
      id: 5,
      name: "Ann Dany Enobil",
      role: "Developpeur Fullstack",
      avatar: "AE",
      color: "#00aa11",
      info: {
        email: "anndanyenobilfranklin@gmail.com",
        technologies: "react, NOde.js,Figma, Mongodb, CSS, HTML",
        location: "France",
        github: "AnnFranklin08",
        
      }
    }
  ];

  // Contenu pour l'animation Matrix
  const matrixContent = [
    "Code> React.js TypeScript Node.js Python Java",
    "DevOps> Docker Kubernetes AWS CI/CD Terraform",
    "Tools> Git Figma VSCode Jira Postman MongoDB",
    "Agile> Scrum Sprint Planning Retrospective",
    "Cloud> AWS Azure GoogleCloud DigitalOcean",
    "Mobile> ReactNative Flutter Swift Kotlin",
    "AI/ML> TensorFlow PyTorch OpenAI DataScience",
    "Web3> Blockchain Solidity SmartContracts Ethereum"
  ];

  // Initialiser l'animation Matrix
  useEffect(() => {
    const layers = document.querySelectorAll('.matrix-layer');
    
    layers.forEach((layer, layerIndex) => {
      const columnsCount = window.innerWidth < 768 ? 15 : window.innerWidth < 1200 ? 25 : 40;
      
      for (let i = 0; i < columnsCount; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        // Position aléatoire
        const left = (i / columnsCount) * 100 + Math.random() * 5;
        column.style.left = `${left}%`;
        
        // Contenu aléatoire
        const content = matrixContent[Math.floor(Math.random() * matrixContent.length)];
        column.setAttribute('data-content', content);
        
        // Animation avec délai et durée aléatoires
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 10 + layerIndex * 5;
        column.style.animationDelay = `-${delay}s`;
        column.style.animationDuration = `${duration}s`;
        
        // Opacité différente par couche
        column.style.opacity = layerIndex === 0 ? '0.9' : layerIndex === 1 ? '0.6' : '0.4';
        
        layer.appendChild(column);
      }
    });
    
    // Cleanup
    return () => {
      layers.forEach(layer => {
        while (layer.firstChild) {
          layer.removeChild(layer.firstChild);
        }
      });
    };
  }, []);

  const toggleMemberInfo = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  return (
    <div className="credits-page">
      {/* Fond Matrix */}
      <Navbar />
      <div className="matrix-background">
        <div className="matrix-layer"></div>
        <div className="matrix-layer"></div>
        <div className="matrix-layer"></div>
      </div>

      <div className="credits-container">
        {/* En-tête */}
        <header className="credits-header">
          <h1 className="credits-title">NOTRE ÉQUIPE</h1>
          <p className="credits-subtitle">
            Une équipe passionnée de professionnels dédiés à l'excellence technique 
            et à l'innovation dans le développement logiciel.
          </p>
        </header>

        {/* Section Projet */}
        <section className="project-section">
          <h2 className="section-title">Le Projet</h2>
          <p className="project-description">
            Nous développons des solutions innovantes qui transforment la façon dont 
            les entreprises interagissent avec la technologie. Notre plateforme 
            combine intelligence artificielle, design moderne et architecture cloud 
            pour offrir une expérience utilisateur exceptionnelle tout en garantissant 
            performance, sécurité et évolutivité.
          </p>
          <p className="project-description" style={{ marginTop: '20px' }}>
            Chaque ligne de code est écrite avec passion, chaque interface est 
            conçue avec soin, et chaque déploiement est exécuté avec précision.
          </p>
        </section>

        {/* Section Équipe */}
        <section className="team-section">
          <h2 className="section-title">Rencontrez notre équipe</h2>
          
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="team-member-card"
                onClick={() => toggleMemberInfo(member.id)}
              >
                {/* Avatar */}
                <div className="member-avatar">
                  <div 
                    className="member-avatar-inner"
                    style={{ 
                      backgroundColor: `${member.color}20`,
                      border: `2px solid ${member.color}80`
                    }}
                  >
                    {member.avatar}
                  </div>
                </div>

                {/* Nom et rôle */}
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>

                {/* Info détaillée (apparaît au clic) */}
                {expandedMember === member.id && (
                  <div className="member-info">
                    <div className="info-item">
                      <Mail className="info-icon" />
                      <span>{member.info.email}</span>
                    </div>
                    
                    <div className="info-item">
                      <Code className="info-icon" />
                      <span>{member.info.technologies}</span>
                    </div>
                    
                    <div className="info-item">
                      <MapPin className="info-icon" />
                      <span>{member.info.location}</span>
                    </div>
                    
                    {member.info.github && (
                      <div className="info-item">
                        <Github className="info-icon" />
                        <span>github.com/{member.info.github}</span>
                      </div>
                    )}
                    
                    {member.info.linkedin && (
                      <div className="info-item">
                        <Linkedin className="info-icon" />
                        <span>linkedin.com/in/{member.info.linkedin}</span>
                      </div>
                    )}
                    
                    {member.info.portfolio && (
                      <div className="info-item">
                        <span className="info-icon">🌐</span>
                        <span>{member.info.portfolio}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Indicateur de clic */}
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '20px', 
                  color: '#00ff55',
                  fontSize: '0.9rem',
                  opacity: 0.8
                }}>
                  {expandedMember === member.id ? '↑ Cacher' : '↓ Voir plus'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#888',
          fontSize: '0.9rem',
          borderTop: '1px solid rgba(0, 255, 85, 0.1)',
          marginTop: '50px'
        }}>
          <p>© {new Date().getFullYear()} Équipe SHADOWS. Tous droits réservés.</p>
          <p style={{ marginTop: '10px', opacity: 0.7 }}>
            Construit avec React, passion et innovation.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CreditsPage;