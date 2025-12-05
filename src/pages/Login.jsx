import React, { useState, useEffect } from 'react';
import '../assets/styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const navigate = useNavigate();

  // Cleanup des timers quand le composant se démonte
  useEffect(() => {
    return () => {
      // Cleanup si nécessaire
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Tentative de connexion avec:', formData.email);

      // 1) Se connecter avec Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Erreur login Supabase:', error);

        // Gestion des erreurs spécifiques
        if (
          error.message.includes('Invalid login credentials') ||
          error.message.includes('Email not confirmed')
        ) {
          setErrors(prev => ({
            ...prev,
            general: 'Email ou mot de passe incorrect',
          }));
        } else if (error.message.includes('User not found')) {
          setErrors(prev => ({
            ...prev,
            email: 'Cet email n\'existe pas',
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            general: error.message || 'Erreur lors de la connexion',
          }));
        }
        setIsSubmitting(false);
        return;
      }

      const user = data.user;
      if (!user || !user.id) {
        console.error('Aucun utilisateur retourné après login');
        setErrors(prev => ({
          ...prev,
          general: 'Erreur lors de la connexion. Réessaie.',
        }));
        setIsSubmitting(false);
        return;
      }

      console.log('✅ Utilisateur connecté avec ID:', user.id);

      // 2) Récupérer le profil joueur
      console.log('Récupération du profil joueur...');

      const { data: joueur, error: joueurError } = await supabase
        .from('joueur')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      if (joueurError) {
        console.warn('Avertissement - Profil joueur non trouvé:', joueurError);
        // On peut continuer même sans profil pour l'instant
      } else {
        console.log('✅ Profil joueur chargé:', joueur);
        // Optionnel : stocker le profil en localStorage ou context
        localStorage.setItem('joueur_profile', JSON.stringify(joueur));
      }

      // 3) SUCCÈS - Afficher le message et rediriger
      setSuccessMessage('Connexion réussie ! 🎉 Redirection...');

      // Réinitialiser le formulaire
      setFormData({
        email: '',
        password: '',
        rememberMe: false,
      });

      // Redirection après 1.5 secondes
      setTimeout(() => {
        console.log('Redirection vers /');
        navigate('/', { replace: true });
      }, 1500);

    } catch (error) {
      console.error('Erreur générale lors de la connexion:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Une erreur inattendue s\'est produite. Réessaie plus tard.',
      }));
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage('');

    if (!forgotEmail.trim()) {
      setForgotMessage('Renseigne ton email pour réinitialiser ton mot de passe.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotMessage('Email invalide');
      return;
    }

    try {
      console.log('Envoi du lien de réinitialisation à:', forgotEmail);

      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Erreur reset password:', error);
        setForgotMessage('Erreur lors de l\'envoi. Vérifie ton email et réessaie.');
      } else {
        console.log('✅ Email de réinitialisation envoyé');
        setForgotMessage(
          '✅ Email de réinitialisation envoyé ! Vérifie ta boîte de réception (et les spams).'
        );
        setForgotEmail('');
      }
    } catch (error) {
      console.error('Erreur générale reset password:', error);
      setForgotMessage('Une erreur est survenue. Réessaie plus tard.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* En-tête */}
        <div className="auth-header">
          <h1 className="auth-title">RebootWorld 🛡️</h1>
          <p className="auth-subtitle">
            Accédez à votre espace numérique responsable
          </p>
        </div>

        {/* Message de succès */}
        {successMessage && (
          <div className="auth-success-message">
            <div className="success-icon">✅</div>
            <p>{successMessage}</p>
          </div>
        )}

        {/* Erreur générale */}
        {errors.general && (
          <div className="auth-error-message">
            <div className="error-icon">⚠️</div>
            <p>{errors.general}</p>
          </div>
        )}

        {/* Formulaire de connexion */}
        {!showForgotPassword ? (
          <>
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Champ Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="ton.email@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="error-text">
                    <span className="error-icon-small">✕</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mot de passe <span className="required">*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                    placeholder="Ton mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="error-text">
                    <span className="error-icon-small">✕</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Se souvenir de moi */}
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="rememberMe" className="checkbox-label">
                  Se souvenir de moi
                </label>
              </div>

              {/* Bouton Connexion */}
              <button
                type="submit"
                className="auth-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            {/* Lien mot de passe oublié */}
            <div className="auth-forgot-password">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Lien vers Signup */}
            <div className="auth-footer">
              <p>
                Pas encore de compte ?{' '}
                <Link to="/signup" className="auth-link">
                  S'inscrire
                </Link>
              </p>
            </div>
          </>
        ) : (
          /* Formulaire réinitialisation mot de passe */
          <>
            <form className="auth-form" onSubmit={handleForgotPassword}>
              <p className="forgot-password-description">
                Renseigne ton email et nous t'enverrons un lien pour réinitialiser ton mot de passe.
              </p>

              {forgotMessage && (
                <div
                  className={`forgot-password-message ${
                    forgotMessage.includes('✅') ? 'success' : 'info'
                  }`}
                >
                  {forgotMessage}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="forgotEmail" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="forgotEmail"
                  className="form-input"
                  placeholder="ton.email@exemple.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="auth-button">
                Envoyer le lien de réinitialisation
              </button>
            </form>

            {/* Lien retour */}
            <div className="auth-footer">
              <button
                type="button"
                className="back-link"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotEmail('');
                  setForgotMessage('');
                }}
              >
                ← Retour à la connexion
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
