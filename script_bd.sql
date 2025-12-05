-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- SCRIPT COMPLET : RebootWorld DB avec Supabase Auth
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ─────────────────────────────────────────────────────────────
-- 0) EXTENSION PGCRYPTO (pour gen_random_uuid)
-- ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- 1) ENUM TYPES
-- ─────────────────────────────────────────────────────────────
CREATE TYPE quiz_result_status AS ENUM ('in_progress', 'finalized', 'cancelled');

-- ─────────────────────────────────────────────────────────────
-- 2) TABLES PRINCIPALES
-- ─────────────────────────────────────────────────────────────

-- JOUEUR : profil utilisateur du jeu
CREATE TABLE IF NOT EXISTS joueur (
  id_joueur uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
  pseudo text NOT NULL,
  email text UNIQUE,
  date_inscription timestamptz NOT NULL DEFAULT now(),
  score_dependance integer NOT NULL DEFAULT 100,
  niveau_global integer DEFAULT 1,
  avatar_url text,
  last_active timestamptz
);

-- QUIZ : ensemble de questions
CREATE TABLE IF NOT EXISTS quiz (
  id_quiz uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  description text,
  theme text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- QUESTION : une question d'un quiz
CREATE TABLE IF NOT EXISTS question (
  id_question uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_quiz uuid NOT NULL REFERENCES quiz (id_quiz) ON DELETE CASCADE,
  ordre integer NOT NULL DEFAULT 0,
  texte text NOT NULL,
  niveau_difficulte integer DEFAULT 1
);

-- CHOIX : propositions de réponse
CREATE TABLE IF NOT EXISTS choix (
  id_choix uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_question uuid NOT NULL REFERENCES question (id_question) ON DELETE CASCADE,
  texte text NOT NULL,
  est_correct boolean DEFAULT false,
  impact_dependance integer NOT NULL DEFAULT 0
);

-- QUIZ_RESULTAT : enregistrement d'un passage de quiz
CREATE TABLE IF NOT EXISTS quiz_resultat (
  id_resultat uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_joueur uuid NOT NULL REFERENCES joueur (id_joueur) ON DELETE CASCADE,
  id_quiz uuid NOT NULL REFERENCES quiz (id_quiz) ON DELETE CASCADE,
  score integer DEFAULT 0,
  score_dependance_initial integer,
  score_dependance_apres integer,
  status quiz_result_status DEFAULT 'in_progress',
  created_at timestamptz NOT NULL DEFAULT now(),
  finalized_at timestamptz
);

-- QUIZ_REPONSE : réponses données pour un résultat
CREATE TABLE IF NOT EXISTS quiz_reponse (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_resultat uuid NOT NULL REFERENCES quiz_resultat (id_resultat) ON DELETE CASCADE,
  id_question uuid NOT NULL REFERENCES question (id_question) ON DELETE CASCADE,
  id_choix uuid NOT NULL REFERENCES choix (id_choix) ON DELETE RESTRICT,
  impact_applique integer NOT NULL,
  answered_at timestamptz NOT NULL DEFAULT now()
);

-- MISSION : objectif / défi
CREATE TABLE IF NOT EXISTS mission (
  id_mission uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL,
  description text,
  points_reduction integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ACTION : étape d'une mission
CREATE TABLE IF NOT EXISTS action (
  id_action uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_mission uuid NOT NULL REFERENCES mission (id_mission) ON DELETE CASCADE,
  titre text NOT NULL,
  description text,
  points_reduction integer NOT NULL DEFAULT 0
);

-- JOUEUR_ACTION : action réalisée par un joueur
CREATE TABLE IF NOT EXISTS joueur_action (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_joueur uuid NOT NULL REFERENCES joueur (id_joueur) ON DELETE CASCADE,
  id_action uuid NOT NULL REFERENCES action (id_action) ON DELETE RESTRICT,
  date_realisation timestamptz NOT NULL DEFAULT now(),
  points_gagnes integer NOT NULL,
  UNIQUE (id_joueur, id_action)
);

-- BADGE : récompense
CREATE TABLE IF NOT EXISTS badge (
  id_badge uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  description text,
  condition_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- JOUEUR_BADGE : badge obtenu par un joueur
CREATE TABLE IF NOT EXISTS joueur_badge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  id_joueur uuid NOT NULL REFERENCES joueur (id_joueur) ON DELETE CASCADE,
  id_badge uuid NOT NULL REFERENCES badge (id_badge) ON DELETE CASCADE,
  date_obtention timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id_joueur, id_badge)
);

-- ─────────────────────────────────────────────────────────────
-- 3) INDEXES POUR PERFORMANCE
-- ─────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_joueur_score ON joueur (score_dependance);
CREATE INDEX IF NOT EXISTS idx_joueur_auth_user_id ON joueur (auth_user_id);
CREATE INDEX IF NOT EXISTS idx_question_quiz ON question (id_quiz);
CREATE INDEX IF NOT EXISTS idx_choix_question ON choix (id_question);
CREATE INDEX IF NOT EXISTS idx_quiz_resultat_joueur ON quiz_resultat (id_joueur);
CREATE INDEX IF NOT EXISTS idx_quiz_resultat_quiz ON quiz_resultat (id_quiz);
CREATE INDEX IF NOT EXISTS idx_quiz_reponse_resultat ON quiz_reponse (id_resultat);
CREATE INDEX IF NOT EXISTS idx_joueur_action_joueur ON joueur_action (id_joueur);
CREATE INDEX IF NOT EXISTS idx_joueur_badge_joueur ON joueur_badge (id_joueur);

-- ─────────────────────────────────────────────────────────────
-- 4) FONCTIONS DE LOGIQUE MÉTIER
-- ─────────────────────────────────────────────────────────────

-- Fonction : finaliser un quiz (calculer score + appliquer impact)
CREATE OR REPLACE FUNCTION finalize_quiz_result(p_resultat uuid)
RETURNS void LANGUAGE plpgsql AS
$$
DECLARE
  v_score integer := 0;
  v_joueur uuid;
  v_before integer;
  v_after integer;
BEGIN
  -- Vérifier que le resultat existe et est en progress
  PERFORM 1 FROM quiz_resultat 
    WHERE id_resultat = p_resultat AND status = 'in_progress';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Resultat introuvable ou déjà finalisé';
  END IF;

  -- Calculer somme des impacts
  SELECT COALESCE(SUM(impact_applique), 0) INTO v_score
  FROM quiz_reponse WHERE id_resultat = p_resultat;

  -- Récupérer id_joueur et score initial
  SELECT id_joueur, score_dependance INTO v_joueur, v_before
  FROM quiz_resultat r
  JOIN joueur j ON r.id_joueur = j.id_joueur
  WHERE r.id_resultat = p_resultat;

  IF v_joueur IS NULL THEN
    RAISE EXCEPTION 'Joueur introuvable pour ce resultat';
  END IF;

  v_after := v_before + v_score;

  -- Mettre à jour le resultat
  UPDATE quiz_resultat
    SET score = v_score,
        score_dependance_initial = v_before,
        score_dependance_apres = v_after,
        status = 'finalized',
        finalized_at = now()
    WHERE id_resultat = p_resultat;

  -- Appliquer le changement au profil joueur
  UPDATE joueur SET score_dependance = v_after WHERE id_joueur = v_joueur;
END;
$$;

-- Fonction : insérer une réponse de quiz (récupère impact automatiquement)
CREATE OR REPLACE FUNCTION insert_quiz_response(
  p_resultat uuid,
  p_question uuid,
  p_choix uuid
)
RETURNS uuid LANGUAGE plpgsql AS
$$
DECLARE
  v_impact integer;
  v_new_id uuid := gen_random_uuid();
BEGIN
  SELECT impact_dependance INTO v_impact FROM choix WHERE id_choix = p_choix;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Choix introuvable';
  END IF;

  INSERT INTO quiz_reponse (id, id_resultat, id_question, id_choix, impact_applique)
  VALUES (v_new_id, p_resultat, p_question, p_choix, v_impact);

  RETURN v_new_id;
END;
$$;

-- Fonction : enregistrer une action complétée (applique points)
CREATE OR REPLACE FUNCTION complete_joueur_action(
  p_joueur uuid,
  p_action uuid
)
RETURNS void LANGUAGE plpgsql AS
$$
DECLARE
  v_points integer;
  v_current_score integer;
BEGIN
  -- Récupérer les points à soustraire
  SELECT points_reduction INTO v_points FROM action WHERE id_action = p_action;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Action introuvable';
  END IF;

  -- Insérer l'enregistrement joueur_action
  INSERT INTO joueur_action (id_joueur, id_action, points_gagnes)
  VALUES (p_joueur, p_action, v_points)
  ON CONFLICT DO NOTHING;

  -- Récupérer score actuel du joueur
  SELECT score_dependance INTO v_current_score FROM joueur WHERE id_joueur = p_joueur;

  -- Appliquer la réduction
  UPDATE joueur SET score_dependance = v_current_score + v_points WHERE id_joueur = p_joueur;
END;
$$;

-- ─────────────────────────────────────────────────────────────
-- 5) VUES UTILES
-- ─────────────────────────────────────────────────────────────

-- Vue : Leaderboard (classement des joueurs)
CREATE OR REPLACE VIEW vw_leaderboard AS
SELECT 
  id_joueur,
  pseudo,
  score_dependance,
  niveau_global,
  date_inscription
FROM joueur
ORDER BY score_dependance ASC, date_inscription ASC;

-- Vue : Profil résumé joueur
CREATE OR REPLACE VIEW vw_joueur_profil AS
SELECT 
  j.id_joueur,
  j.pseudo,
  j.email,
  j.score_dependance,
  j.niveau_global,
  j.avatar_url,
  COUNT(DISTINCT ja.id_action) AS actions_realisees,
  COUNT(DISTINCT jb.id_badge) AS badges_obtenus,
  COUNT(DISTINCT qr.id_resultat) AS quizzes_complets,
  MAX(qr.finalized_at) AS dernier_quiz
FROM joueur j
LEFT JOIN joueur_action ja ON ja.id_joueur = j.id_joueur
LEFT JOIN joueur_badge jb ON jb.id_joueur = j.id_joueur
LEFT JOIN quiz_resultat qr ON qr.id_joueur = j.id_joueur AND qr.status = 'finalized'
GROUP BY j.id_joueur, j.pseudo, j.email, j.score_dependance, j.niveau_global, j.avatar_url;

-- Vue : Progression des missions
CREATE OR REPLACE VIEW vw_mission_progression AS
SELECT 
  m.id_mission,
  m.titre,
  m.description,
  m.points_reduction,
  COUNT(a.id_action) AS nombre_actions,
  COUNT(DISTINCT ja.id_joueur) AS joueurs_engages
FROM mission m
LEFT JOIN action a ON a.id_mission = m.id_mission
LEFT JOIN joueur_action ja ON ja.id_action = a.id_action
GROUP BY m.id_mission, m.titre, m.description, m.points_reduction;

-- ─────────────────────────────────────────────────────────────
-- 6) DONNÉES DE TEST (optionnel)
-- ─────────────────────────────────────────────────────────────

-- Insérer des badges
INSERT INTO badge (nom, description, condition_json) VALUES
  ('Premier Pas', 'Répondre à ton premier quiz', '{"type": "first_quiz"}'),
  ('Éco-Champion', 'Réduire ta dépendance à moins de 50', '{"type": "score_below", "threshold": 50}'),
  ('Collecteur de Points', 'Completer 5 actions', '{"type": "actions_count", "threshold": 5}');

-- Insérer un quiz d'exemple
INSERT INTO quiz (titre, description, theme) VALUES
  ('Test de Dépendance Numérique', 'Mesure ton niveau de dépendance aux BigTech', 'profil');

-- Récupérer l'ID du quiz (adapter si nécessaire)
-- INSERT INTO question (id_quiz, ordre, texte, niveau_difficulte) VALUES
--   ((SELECT id_quiz FROM quiz WHERE titre = 'Test de Dépendance Numérique'), 1, 'Combien de fois par jour consultes-tu tes réseaux?', 1);

-- ─────────────────────────────────────────────────────────────
-- 7) ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────
-- À activer après pour sécuriser l'accès basé sur l'utilisateur Supabase

-- Activer RLS sur les tables sensibles
ALTER TABLE joueur ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_resultat ENABLE ROW LEVEL SECURITY;
ALTER TABLE joueur_action ENABLE ROW LEVEL SECURITY;
ALTER TABLE joueur_badge ENABLE ROW LEVEL SECURITY;

-- Politique : un joueur ne peut lire/modifier que son propre profil
CREATE POLICY "Joueur voir son profil" ON joueur
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Joueur modifier son profil" ON joueur
  FOR UPDATE USING (auth.uid() = auth_user_id);

-- Politique : un joueur ne voit que ses résultats de quiz
CREATE POLICY "Joueur voir ses résultats" ON quiz_resultat
  FOR SELECT USING (
    id_joueur IN (SELECT id_joueur FROM joueur WHERE auth_user_id = auth.uid())
  );

-- Politique : un joueur ne voit que ses actions
CREATE POLICY "Joueur voir ses actions" ON joueur_action
  FOR SELECT USING (
    id_joueur IN (SELECT id_joueur FROM joueur WHERE auth_user_id = auth.uid())
  );

-- Politique : un joueur ne voit que ses badges
CREATE POLICY "Joueur voir ses badges" ON joueur_badge
  FOR SELECT USING (
    id_joueur IN (SELECT id_joueur FROM joueur WHERE auth_user_id = auth.uid())
  );

-- ─────────────────────────────────────────────────────────────
-- FIN DU SCRIPT
-- ─────────────────────────────────────────────────────────────
