import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaGamepad, FaFlask, FaHandshake } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // ref to focus first link when menu opens
  const firstLinkRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  // Close menu on route change
  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Close menu when viewport becomes wider than mobile breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && isOpen) closeMenu();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  // Close on Escape and focus management when opening
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    };
    window.addEventListener('keydown', onKey);
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            RebootWorld
          </div>

          <ul className="navbar-links-desktop">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}><FaHome style={{fontSize: '24px'}}/> Accueil</Link>
            </li>
            <li>
              <Link to="/gamehome" className={isActive('/gamehome') ? 'active' : ''}><FaGamepad style={{fontSize: '24px'}}/> Jeu & Apprentissage</Link>
            </li>
            <li>
              <Link to="/nird" className={isActive('/nird') ? 'active' : ''}><FaFlask style={{fontSize: '22px'}}/> NIRD</Link>
            </li>
            <li>
              <Link to="/credit" className={isActive('/credit') ? 'active' : ''}><FaHandshake style={{fontSize: '24px'}}/> Crédit</Link>
            </li>
          </ul>

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

      {isOpen && (
        <div id="navbar-fullscreen" className="navbar-fullscreen" role="dialog" aria-modal="true">
          <div className="navbar-full-top">
            <div className="navbar-logo">
              RebootWorld
            </div>
            <button
              className="navbar-toggle is-open"
              aria-label="Fermer le menu"
              aria-expanded="true"
              style={{color: 'white'}}
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
                <FaHome style={{fontSize: '24px'}}/>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/gamehome" onClick={closeMenu} className={isActive('/gamehome') ? 'active' : ''}>
                <FaGamepad style={{fontSize: '24px'}}/>
                Jeu & Apprentissage
              </Link>
            </li>
            <li>
              <Link to="/nird" onClick={closeMenu} className={isActive('/nird') ? 'active' : ''}>
                <FaFlask style={{fontSize: '24px'}}/>
                NIRD
              </Link>
            </li>
            <li>
              <Link to="/credit" onClick={closeMenu} className={isActive('/credit') ? 'active' : ''}>
                <FaHandshake style={{fontSize: '24px'}}/>
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
