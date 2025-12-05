import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaGamepad, 
  FaFlask, 
  FaHandshake, 
  FaUserCircle, 
  FaSignInAlt, 
  FaUserPlus,
  FaChartBar,
  FaSignOutAlt,
  FaCog
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  const firstLinkRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

  const isActive = (path) => location.pathname === path;

  // Fermer les menus lors du changement de route
  useEffect(() => {
    closeMenu();
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Fermer le menu mobile quand la fenêtre s'agrandit
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 850 && isOpen) closeMenu();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  // Gestion des touches clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
      if (e.key === 'Escape' && userMenuOpen) setUserMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, userMenuOpen]);

  // Fermer les menus en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        closeMenu();
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && userMenuOpen) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, userMenuOpen]);

  // Simuler la vérification d'authentification
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('authToken', 'simulated-token');
    navigate('/dashboard');
    closeMenu();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/signup');
    closeMenu();
  };

  const handleAnalyze = () => {
    navigate('/analyse');
    closeMenu();
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            RebootWorld
          </div>

          {/* Navigation desktop */}
          <ul className="navbar-links-desktop">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>
                <FaHome style={{fontSize: '24px'}}/> Accueil
              </Link>
            </li>
            <li>
              <Link to="/gamehome" className={isActive('/gamehome') ? 'active' : ''}>
                <FaGamepad style={{fontSize: '24px'}}/> Jeu & Apprentissage
              </Link>
            </li>
            <li>
              <Link to="/nird" className={isActive('/nird') ? 'active' : ''}>
                <FaFlask style={{fontSize: '22px'}}/> NIRD
              </Link>
            </li>
            <li>
              <Link to="/creditpage" className={isActive('/creditpage') ? 'active' : ''}>
                <FaHandshake style={{fontSize: '24px'}}/> Crédit
              </Link>
            </li>
            <li>
              <Link to="/analyse" className={isActive('/analyse') ? 'active' : ''}>
                <FaChartBar style={{fontSize: '24px'}}/> Analyser
              </Link>
            </li>
            
            {/* Section authentification desktop */}
            <div className="desktop-auth-section">
              {isLoggedIn ? (
                <div className="user-menu-container" ref={userMenuRef}>
                  <button 
                    className="user-menu-toggle"
                    onClick={toggleUserMenu}
                    aria-expanded={userMenuOpen}
                    aria-label="Menu utilisateur"
                  >
                    <FaUserCircle className="user-avatar-icon" />
                    <span className="user-name">Mon Compte</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <FaUserCircle className="user-dropdown-avatar" />
                        <div className="user-details">
                          <span className="user-email">utilisateur@example.com</span>
                          <span className="user-role">Membre</span>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <FaUserCircle /> Mon Profil
                      </Link>
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <FaChartBar /> Tableau de bord
                      </Link>
                      <Link to="/settings" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <FaCog /> Paramètres
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-links-desktop">
                  <Link to="/login" className="auth-link login-link">
                    <FaSignInAlt /> Connexion
                  </Link>
                  <Link to="/signup" className="auth-link signup-link">
                    <FaUserPlus /> Inscription
                  </Link>
                </div>
              )}
            </div>
          </ul>

          {/* Bouton hamburger pour mobile */}
          <button
            className={`navbar-toggle ${isOpen ? 'is-open' : ''}`}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="navbar-fullscreen"
            aria-haspopup="true"
            onClick={toggleMenu}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </header>

      {/* Menu mobile fullscreen */}
      {isOpen && (
        <div id="navbar-fullscreen" className="navbar-fullscreen" role="dialog" aria-modal="true" ref={menuRef}>
          <div className="navbar-full-top">
            <div className="navbar-logo">
              RebootWorld
            </div>
            <button
              className="navbar-toggle is-open"
              aria-label="Fermer le menu"
              aria-expanded="true"
              onClick={closeMenu}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>

          <ul className="navbar-links">
            <li>
              <Link ref={firstLinkRef} to="/" onClick={closeMenu} className={isActive('/') ? 'active' : ''}>
                <FaHome style={{fontSize: '36px'}}/>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/gamehome" onClick={closeMenu} className={isActive('/gamehome') ? 'active' : ''}>
                <FaGamepad style={{fontSize: '36px'}}/>
                Jeu & Apprentissage
              </Link>
            </li>
            <li>
              <Link to="/nird" onClick={closeMenu} className={isActive('/nird') ? 'active' : ''}>
                <FaFlask style={{fontSize: '36px'}}/>
                NIRD
              </Link>
            </li>
            <li>
              <Link to="/creditpage" onClick={closeMenu} className={isActive('/creditpage') ? 'active' : ''}>
                <FaHandshake style={{fontSize: '36px'}}/>
                Crédit
              </Link>
            </li>
            <li>
              <Link to="/analyse" onClick={closeMenu} className={isActive('/analyse') ? 'active' : ''}>
                <FaChartBar style={{fontSize: '36px'}}/>
                Analyser
              </Link>
            </li>
          </ul>

          {/* Section authentification mobile */}
          <div className="navbar-mobile-auth">
            {isLoggedIn ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <FaUserCircle className="mobile-user-avatar" />
                  <div className="mobile-user-details">
                    <span className="mobile-user-name">Utilisateur</span>
                    <span className="mobile-user-email">utilisateur@example.com</span>
                  </div>
                </div>
                <div className="mobile-user-links">
                  <Link to="/profile" className="mobile-auth-link" onClick={closeMenu}>
                    <FaUserCircle /> Mon Profil
                  </Link>
                  <Link to="/dashboard" className="mobile-auth-link" onClick={closeMenu}>
                    <FaChartBar /> Tableau de bord
                  </Link>
                  <Link to="/settings" className="mobile-auth-link" onClick={closeMenu}>
                    <FaCog /> Paramètres
                  </Link>
                  <button className="mobile-logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <div className="mobile-guest-section">
                <Link to="/login" className="mobile-auth-link login-link" onClick={closeMenu}>
                  <FaSignInAlt /> Connexion
                </Link>
                <Link to="/signup" className="mobile-auth-link signup-link" onClick={closeMenu}>
                  <FaUserPlus /> Inscription
                </Link>
                <div className="mobile-auth-divider">
                  <span>ou</span>
                </div>
                <button className="mobile-guest-btn" onClick={closeMenu}>
                  Continuer en tant qu'invité
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;