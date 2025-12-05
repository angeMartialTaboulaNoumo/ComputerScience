import React from 'react';
import { 
  BarChart3, 
  Leaf, 
  Zap, 
  Image as ImageIcon, 
  HardDrive, 
  FileCode, 
  AlertTriangle 
} from 'lucide-react';
import '../assets/styles/AnalyseDashboard.css';
import Navbar from '../components/Navbar';

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Octets';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Octets', 'Ko', 'Mo', 'Go'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const ScoreCard = ({ title, score, grade, icon: Icon, type }) => {
  // Logique CSS simplifiée
  let status = "danger"; // danger, warning, success
  
  if (type === 'ecoindex') {
    if (['A', 'B'].includes(grade)) status = "success";
    else if (['C', 'D'].includes(grade)) status = "warning";
  } else if (type === 'lighthouse') {
    if (score >= 0.9) status = "success";
    else if (score >= 0.5) status = "warning";
  }

  return (
    <div className="card">
      <Navbar/>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <Icon size={20} color="#9ca3af" />
      </div>
      
      <div className="score-row">
        <span className="score-value">
          {type === 'lighthouse' ? Math.round(score * 100) : score}
        </span>
        {grade && (
          <span className={`score-badge style-${status}`}>
            Classe {grade}
          </span>
        )}
      </div>
      
      {/* Barre de progression */}
      <div className="progress-track">
        <div 
          className={`progress-fill fill-${status}`} 
          style={{ width: `${type === 'lighthouse' ? score * 100 : score}%` }}
        ></div>
      </div>
      <p className="subtext-right">Sur 100</p>
    </div>
  );
};

const MetricCard = ({ label, value, subtext, icon: Icon }) => (
  <div className="card">
    <div className="metric-content">
      <div>
        <p className="card-title" style={{ textTransform: 'none' }}>{label}</p>
        <p className="metric-value">{value}</p>
        {subtext && <p className="metric-sub">{subtext}</p>}
      </div>
      <div className="icon-box">
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const AuditDashboard = ({ data }) => {
  const report = data || {
    url: "https://ton-site-ngrok.io",
    nb_requetes: 41,
    poids_total: "1.8Mo",
    images: [],
    ecoindex: { score: 65, class: "C" },
    lighthouse: { performance: 0.89 },
    coverage: { unused_js: 120000, unused_css: 45000 }
  };

  const totalUnused = report.coverage.unused_js + report.coverage.unused_css;

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        
        {/* En-tête */}
        <header className="dashboard-header">
          <div className="header-title">
            <h1>
              <BarChart3 color="#4f46e5" size={32} />
              Rapport d'Audit Web
            </h1>
            <p>Analyse effectuée pour : <a href={report.url}>{report.url}</a></p>
          </div>
          <div>
             <span className="status-badge">Statut: Terminé</span>
          </div>
        </header>

        {/* Section Scores */}
        <div className="grid-2">
          <ScoreCard 
            title="EcoIndex" 
            score={report.ecoindex.score} 
            grade={report.ecoindex.class} 
            icon={Leaf} 
            type="ecoindex" 
          />
          <ScoreCard 
            title="Lighthouse Performance" 
            score={report.lighthouse.performance} 
            icon={Zap} 
            type="lighthouse" 
          />
        </div>

        {/* Section Métriques */}
        <div className="grid-3">
          <MetricCard 
            label="Poids Total" 
            value={report.poids_total} 
            subtext="Objectif recommandé: < 1Mo"
            icon={HardDrive} 
          />
          <MetricCard 
            label="Requêtes HTTP" 
            value={report.nb_requetes} 
            subtext="Fichiers chargés"
            icon={BarChart3} 
          />
          <MetricCard 
            label="Images Détectées" 
            value={report.images.length} 
            subtext="Ressources graphiques"
            icon={ImageIcon} 
          />
        </div>

        {/* Section Coverage */}
        <div className="card">
          <div className="card-top">
            <h3 className="section-title">
              <FileCode size={20} />
              Couverture du Code & Optimisations
            </h3>
            {totalUnused > 50000 && (
              <span className="warning-badge">
                <AlertTriangle size={14} /> Optimisation possible
              </span>
            )}
          </div>
          
          <div className="grid-2">
            {/* JavaScript Unused */}
            <div>
              <div className="coverage-label">
                <span>JavaScript Inutilisé</span>
                <span className="text-danger">{formatBytes(report.coverage.unused_js)}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill bg-danger" style={{ width: '60%' }}></div> 
              </div>
              <p className="metric-sub" style={{ marginTop: '0.5rem' }}>Code JS chargé mais non exécuté.</p>
            </div>

            {/* CSS Unused */}
            <div>
              <div className="coverage-label">
                <span>CSS Inutilisé</span>
                <span className="text-danger" style={{ color: '#eab308' }}>{formatBytes(report.coverage.unused_css)}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill bg-warning" style={{ width: '40%' }}></div>
              </div>
              <p className="metric-sub" style={{ marginTop: '0.5rem' }}>Règles CSS non appliquées.</p>
            </div>
          </div>

          <div className="info-box" style={{ marginTop: '2rem' }}>
             <p style={{ margin: 0 }}>
               <strong>Impact écologique :</strong> En supprimant le code mort (~{formatBytes(totalUnused)}), 
               vous réduisez le transfert de données et la consommation CPU.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuditDashboard;