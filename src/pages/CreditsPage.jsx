import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Code, Linkedin, Github, MapPin } from 'lucide-react';
import '../assets/styles/CreditsPage.css';
import '../assets/styles/MatrixBackground.css';

const CreditsPage = () => {
  const [expandedMember, setExpandedMember] = useState(null);

  // Données de l'équipe
  const teamMembers = [
    {
      id: 1,
      name: "TABOULA NOUMO Ange",
      role: "Lead Développeur Full-Stack",
      avatar: "TN ",
      color: "#00ff55",
      info: {
        email: "alex.dubois@tech-dev.fr",
        technologies: "React, Node.js, Python, AWS",
        location: "Paris, France",
        github: "alex-dubois-dev",
        linkedin: "alexandre-dubois"
      }
    },
    {
      id: 2,
      name: "TCHANME Franck",
      role: "Designer UX/UI Senior",
      avatar: "TF",
      color: "#00dd44",
      info: {
        email: "sophie.laurent@design.io",
        technologies: "Figma, Adobe Suite, React",
        location: "Lyon, France",
        portfolio: "sophielaurent.design",
        linkedin: "sophie-laurent-design"
      }
    },
    {
      id: 3,
      name: "Thomas Moreau",
      role: "Architecte Backend",
      avatar: "TM",
      color: "#00cc33",
      info: {
        email: "thomas.moreau@backend.dev",
        technologies: "Java, Spring, PostgreSQL, Docker",
        location: "Toulouse, France",
        github: "tmoreau-backend",
        linkedin: "thomas-moreau-architect"
      }
    },
    {
      id: 4,
      name: "Camille Petit",
      role: "Product Manager",
      avatar: "CP",
      color: "#00bb22",
      info: {
        email: "camille.petit@product.co",
        technologies: "Agile, Scrum, Jira, Analytics",
        location: "Bordeaux, France",
        linkedin: "camille-petit-pm"
      }
    },
    {
      id: 5,
      name: "Mehdi El Amrani",
      role: "DevOps Engineer",
      avatar: "ME",
      color: "#00aa11",
      info: {
        email: "mehdi.elamrani@devops.tech",
        technologies: "Kubernetes, CI/CD, Terraform, Azure",
        location: "Marseille, France",
        github: "mehdi-devops",
        linkedin: "mehdi-el-amrani"
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
      <div className="matrix-background">
        <div className="matrix-layer"></div>
        <div className="matrix-layer"></div>
        <div className="matrix-layer"></div>
      </div>

      {/* Bouton retour */}
      <a href="/" className="back-button">
        <ArrowLeft size={18} style={{ marginRight: '8px' }} />
        Retour
      </a>

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

export default CreditsPage;