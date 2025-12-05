import React, { useState, useEffect } from 'react';
import '../assets/styles/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.jsx';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Cleanup des timers quand le composant se démonte
  useEffect(() => {
    return () => {
      // Cleanup si nécessaire
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Le nom doit avoir au moins 3 caractères';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit avoir au moins 8 caractères';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule';
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins un chiffre';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
      // 1) Créer le compte Supabase Auth
      console.log('Tentative de création du compte avec email:', formData.email);
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        console.error('Erreur signup Supabase:', signUpError);

        // Gestion des erreurs spécifiques
        if (signUpError.message.includes('already registered')) {
          setErrors(prev => ({
            ...prev,
            email: 'Cet email est déjà utilisé',
          }));
        } else if (signUpError.message.includes('Invalid')) {
          setErrors(prev => ({
            ...prev,
            email: signUpError.message,
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            general: signUpError.message || 'Erreur lors de la création du compte',
          }));
        }
        setIsSubmitting(false);
        return;
      }

      const user = signUpData.user;
      if (!user || !user.id) {
        console.error('Aucun utilisateur retourné après signup');
        setErrors(prev => ({
          ...prev,
          general: 'Impossible de créer le compte. Réessaie dans un instant.',
        }));
        setIsSubmitting(false);
        return;
      }

      console.log('✅ Utilisateur créé avec ID:', user.id);

      // 2) Créer le profil joueur lié à cet utilisateur
      console.log('Création du profil joueur...');
      
      const { data: joueurData, error: joueurError } = await supabase
        .from('joueur')
        .insert({
          auth_user_id: user.id,
          pseudo: formData.name,
          email: formData.email,
          score_dependance: 100,
          niveau_global: 1,
        })
        .select();

      if (joueurError) {
        console.error('Erreur création profil joueur:', joueurError);
        setErrors(prev => ({
          ...prev,
          general: 'Erreur lors de la création du profil joueur. Contacte le support.',
        }));
        setIsSubmitting(false);
        return;
      }

      console.log('✅ Profil joueur créé avec succès:', joueurData);

      // 3) SUCCÈS - Afficher le message et rediriger
      setSuccessMessage(
        "Inscription réussie ! 🎉 Redirection vers la connexion..."
      );

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Redirection après 1.5 secondes
      setTimeout(() => {
        console.log('Redirection vers /login');
        navigate('/login', { replace: true });
      }, 1500);

    } catch (error) {
      console.error('Erreur générale lors de l\'inscription:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Une erreur inattendue s\'est produite. Réessaie plus tard.',
      }));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* En-tête */}
        <div className="auth-header">
          <h1 className="auth-title">RebootWorld 🛡️</h1>
          <p className="auth-subtitle">
            Rejoignez la communauté du numérique responsable
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

        {/* Formulaire */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Champ Nom / Pseudo */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Pseudo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Ton pseudo du village NIRD"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="username"
            />
            {errors.name && (
              <p className="error-text">
                <span className="error-icon-small">✕</span>
                {errors.name}
              </p>
            )}
          </div>

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
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="Min. 8 caractères (maj + chiffre)"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="error-text">
                <span className="error-icon-small">✕</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Champ Confirmer mot de passe */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmer le mot de passe <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Répète ton mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="error-text">
                <span className="error-icon-small">✕</span>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Bouton Inscription */}
          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Inscription en cours...
              </>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>

        {/* Lien vers Login */}
        <div className="auth-footer">
          <p>
            Déjà un compte ?{' '}
            <Link to="/login" className="auth-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
