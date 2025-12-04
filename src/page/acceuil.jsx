import React, { useState, useEffect } from 'react';
import './Accueil.css';

const Accueil = () => {
  // État pour la fonctionnalité de carrousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Données pour le carrousel
  const slides = [
    {
      id: 1,
      title: "Bienvenue sur notre site",
      description: "Découvrez nos services exceptionnels",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600",
      cta: "En savoir plus"
    },
    {
      id: 2,
      title: "Innovation & Créativité",
      description: "Des solutions modernes pour vos besoins",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600",
      cta: "Découvrir"
    },
    {
      id: 3,
      title: "Excellence & Qualité",
      description: "Un engagement constant envers l'excellence",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600",
      cta: "Nous contacter"
    }
  ];

  // Données pour les services
  const services = [
    {
      icon: "🚀",
      title: "Développement Web",
      description: "Création de sites web modernes et responsives"
    },
    {
      icon: "📱",
      title: "Applications Mobile",
      description: "Applications iOS et Android sur mesure"
    },
    {
      icon: "🎨",
      title: "Design UX/UI",
      description: "Interfaces utilisateur intuitives et attractives"
    },
    {
      icon: "⚙️",
      title: "Maintenance",
      description: "Support et maintenance continue"
    }
  ];

  // Données pour les témoignages
  const testimonials = [
    {
      name: "Marie Dupont",
      role: "CEO, TechCorp",
      text: "Service exceptionnel et résultats dépassant nos attentes.",
      avatar: "👩"
    },
    {
      name: "Jean Martin",
      role: "Directeur Marketing",
      text: "Une équipe professionnelle qui comprend parfaitement les besoins clients.",
      avatar: "👨"
    },
    {
      name: "Sophie Leroy",
      role: "Entrepreneure",
      text: "Le meilleur investissement que nous ayons fait cette année.",
      avatar: "👩‍💼"
    }
  ];

  // Gestion du carrousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Fonctions de navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="accueil">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🌟</span>
            <h1>MonSite</h1>
          </div>
          
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#accueil" className="active">Accueil</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#apropos">À propos</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          
          <button className="cta-button">Commencer</button>
        </div>
      </nav>

      {/* Hero Section avec Carrousel */}
      <section className="hero" id="accueil">
        <div className="carousel">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button className="hero-cta">{slide.cta}</button>
              </div>
            </div>
          ))}
          
          <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
          <button className="carousel-btn next" onClick={nextSlide}>›</button>
          
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <h2>Nos Services</h2>
            <p>Des solutions complètes pour votre réussite numérique</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#" className="service-link">Découvrir →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Projets réalisés</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Clients satisfaits</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Experts dédiés</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Ce que disent nos clients</h2>
            <p>Des retours d'expérience authentiques</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à démarrer votre projet ?</h2>
            <p>Contactez-nous pour une consultation gratuite</p>
            <div className="cta-buttons">
              <button className="cta-primary">Nous contacter</button>
              <button className="cta-secondary">Voir nos projets</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <span className="logo-icon">🌟</span>
                <h3>MonSite</h3>
              </div>
              <p>Transformons vos idées en réalité numérique.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="LinkedIn">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Liens rapides</h4>
              <ul>
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#apropos">À propos</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Développement Web</a></li>
                <li><a href="#">Applications Mobile</a></li>
                <li><a href="#">Design UI/UX</a></li>
                <li><a href="#">Consulting</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li>📧 contact@monsite.com</li>
                <li>📞 +33 1 23 45 67 89</li>
                <li>📍 Paris, France</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} MonSite. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Accueil;