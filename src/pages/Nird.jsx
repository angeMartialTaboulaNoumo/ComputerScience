import React from 'react';
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';
import '../assets/styles/Nird.css';

export default function Nirb() {
    const nirdDefinitions = [
        {
            letter: "N",
            word: "Numérique",
            desc: "Un outil au service de l'humain, pas l'inverse. Il doit rester un moyen d'émancipation.",
            color: "#3498db" // Bleu
        },
        {
            letter: "I",
            word: "Inclusif",
            desc: "Accessible à toutes et tous, peu importe le handicap, le genre ou les moyens financiers.",
            color: "#e67e22" // Orange
        },
        {
            letter: "R",
            word: "Responsable",
            desc: "Éthique dans la gestion des données (RGPD) et souverain (hébergé en France/UE).",
            color: "#e74c3c" // Rouge
        },
        {
            letter: "D",
            word: "Durable",
            desc: "Sobriété énergétique et lutte contre l'obsolescence programmée (faire durer le matériel).",
            color: "#27ae60" // Vert
        }
    ];

    // 2. Données pour le comparateur Logiciels [cite: 103, 61]
    const softwareBattle = [
        { goliath: "Windows 10/11", village: "Linux Mint / PrimTux", icon: "🐧" },
        { goliath: "Microsoft Office", village: "LibreOffice", icon: "📄" },
        { goliath: "Google Drive", village: "Nextcloud", icon: "☁️" },
        { goliath: "Chrome / Edge", village: "Firefox", icon: "🦊" },
        { goliath: "Zoom / Teams", village: "BigBlueButton", icon: "🎥" },
    ];

    return (
        <div className="nird-container" id="nird">
            <Navbar />
            <ChatWidget />

            <h1 className="nird-title">La Démarche N.I.R.D.</h1>
            <p className="nird-intro">
                Face à l'Empire Numérique, le village s'organise autour de 4 piliers.
                Passez votre souris sur les cartes pour découvrir notre code d'honneur !
            </p>

            <div className="cards-grid">
                {nirdDefinitions.map((item, index) => (
                    <div key={index} className="flip-card">
                        <div className="flip-card-inner">
                            {/* FACE AVANT : La Lettre */}
                            <div className="flip-card-front" style={{ backgroundColor: item.color }}>
                                <h1>{item.letter}</h1>
                                <p>{item.word}</p>
                            </div>
                            {/* FACE ARRIÈRE : La Définition */}
                            <div className="flip-card-back" style={{ borderColor: item.color }}>
                                <h2>{item.word}</h2>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="arsenal-section">
                <h2>⚔️ L'Arsenal du Libre</h2>
                <p>Remplacez les outils de l'Empire par nos solutions forgeronnes.</p>

                <div className="comparison-table">
                    <div className="table-header">
                        <span>L'Empire (Goliath)</span>
                        <span>VS</span>
                        <span>Le Village (Libre)</span>
                    </div>
                    {softwareBattle.map((soft, index) => (
                        <div key={index} className="table-row">
                            <span className="bad-tech">{soft.goliath}</span>
                            <span className="icon">{soft.icon}</span>
                            <span className="good-tech">{soft.village}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="resource-link">
                <p>Envie d'aller plus loin ?</p>
                <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noreferrer" className="btn-forge">
                    Visiter la Forge NIRD ➜
                </a>
            </div>
        </div>
    );
}