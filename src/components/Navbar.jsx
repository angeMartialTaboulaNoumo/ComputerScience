import React, { useState } from 'react';
import '../assets/styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Barre du haut toujours visible */}
      <header className="navbar">
        <div className="navbar-inner">
          {/* Logo à gauche */}
          <div className="navbar-logo">
            RebootWorld 🛡️
          </div>

          {/* Liens desktop à droite */}
          <ul className="navbar-links-desktop">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/gamehome">Jeu</Link>
            </li>
            <li>
              <Link to="/nird">NIRD</Link>
            </li>
            <li>
              <Link to="">Crédit</Link>
            </li>
          </ul>

          {/* Hamburger (mobile) complètement à droite */}
          <button
            className={`navbar-toggle ${isOpen ? 'is-open' : ''}`}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </header>

      {/* Overlay plein écran AU-DESSUS de tout (menu mobile) */}
      {isOpen && (
        <div className="navbar-fullscreen">
          <div className="navbar-full-top">
            <div className="navbar-logo">
              RebootWorld 🛡️
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
              <Link to="/" onClick={closeMenu}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/gamehome" onClick={closeMenu}>
                Jeu
              </Link>
            </li>
            <li>
              <Link to="/nird" onClick={closeMenu}>
                NIRD
              </Link>
            </li>
            <li>
              <Link to="" onClick={closeMenu}>
                Crédit
              </Link>
            </li>
          </ul>

          <div className="login-badge" title="Se connecter / Profil">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Avatar"
              className="login-avatar"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
