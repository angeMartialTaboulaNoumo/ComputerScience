import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';
import '../assets/styles/GameHome.css';

const modulesData = [
    {
        id: 1,
        title: "L'Invasion de Windows 10",
        content: {
            question: "Que faire de 200 PC non compatibles Windows 11 ?",
            answers: [
                { text: "Les jeter (Obsolescence)", correct: false },
                { text: "Installer Linux (Réemploi)", correct: true }
            ]
        }
    },
    {
        id: 2,
        title: "Le Cloud Souverain",
        content: {
            question: "Où héberger les données sensibles du village ?",
            answers: [
                { text: "Cloud public (ex: US)", correct: false },
                { text: "Serveur souverain (local)", correct: true }
            ]
        }
    },
    {
        id: 3,
        title: "Réemploi & Réduction",
        content: {
            question: "Quelle option réduit le plus l'empreinte matérielle ?",
            answers: [
                { text: "Acheter du neuf", correct: false },
                { text: "Réemployer / mettre à jour", correct: true }
            ]
        }
    }
];

const GameHome = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizTaken, setQuizTaken] = useState(() => localStorage.getItem('ecoScore') !== null);
    const [placeholder] = useState(() => Math.floor(20 + Math.random() * 60));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [finalScore, setFinalScore] = useState(() => {
        const s = localStorage.getItem('ecoScore');
        return s ? Number(s) : null;
    });

    useEffect(() => {
        if (quizTaken && finalScore !== null) {
            localStorage.setItem('ecoScore', String(finalScore));
        }
    }, [quizTaken, finalScore]);

    const startQuiz = () => {
        setAnswers([]);
        setCurrentIndex(0);
        setQuizStarted(true);
    };

    const handleAnswer = (isCorrect) => {
        const next = [...answers, { moduleId: modulesData[currentIndex].id, correct: !!isCorrect }];
        setAnswers(next);
        if (currentIndex + 1 < modulesData.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const correctCount = next.filter(a => a.correct).length;
            const percent = Math.round((correctCount / next.length) * 100);
            setFinalScore(percent);
            setQuizTaken(true);
            setQuizStarted(false);
        }
    };

    const resetQuiz = () => {
        setQuizTaken(false);
        setFinalScore(null);
        localStorage.removeItem('ecoScore');
    };

    const displayedScore = useMemo(() =>
        (quizTaken && finalScore !== null ? finalScore : placeholder),
        [quizTaken, finalScore, placeholder]
    );

    return (
        <div className="game-home-container">
            <Navbar />
            <ChatWidget />
            {!quizStarted ? (
                <div className="hero-section">
                    <div className="hero-content">
                        <div className="hero-text-column">
                            <h1 className="hero-title">Mesure ton impact numérique</h1>
                            <p className="hero-subtitle">
                                Découvre ton niveau de connaissances en numérique responsable
                                et obtient ton éco‑score personnalisé.
                            </p>
                            <p className="hero-description">
                                Un quiz rapide de 3 questions pour évaluer ta compréhension
                                des enjeux du numérique durable. Simple, instructif et utile.
                            </p>
                            <div className="hero-actions">
                                <button className="primary-button" onClick={startQuiz}>
                                    Mesurer mon éco‑score
                                </button>
                                {quizTaken && (
                                    <button className="secondary-button" onClick={resetQuiz}>
                                        Refaire le test
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="hero-score-column">
                            <div className={`score-display ${!quizTaken ? 'score-blurred' : ''}`}>
                                <div className="score-number">{displayedScore}</div>
                                <div className="score-label">Éco‑score</div>
                                {!quizTaken && (
                                    <div className="score-hint">Passe le test pour dévoiler ton score réel</div>
                                )}
                                {quizTaken && (
                                    <div className="score-feedback">
                                        {finalScore >= 70 ? 'Excellent !' :
                                            finalScore >= 50 ? 'Bon départ !' :
                                                'À améliorer !'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="quiz-section">
                    <div className="quiz-header">
                        <div className="quiz-progress">
                            Question {currentIndex + 1} sur {modulesData.length}
                        </div>
                        <h2 className="quiz-category">{modulesData[currentIndex].title}</h2>
                    </div>

                    <div className="quiz-content">
                        <h3 className="quiz-question">
                            {modulesData[currentIndex].content?.question || 'Question indisponible'}
                        </h3>

                        <div className="answers-grid">
                            {(modulesData[currentIndex].content?.answers || []).map((answer, index) => (
                                <button
                                    key={index}
                                    className="answer-button"
                                    onClick={() => handleAnswer(answer.correct)}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quiz-footer">
                        <button
                            className="quit-button"
                            onClick={() => setQuizStarted(false)}
                        >
                            ← Retour
                        </button>
                        <div className="progress-dots">
                            {modulesData.map((_, index) => (
                                <div
                                    key={index}
                                    className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameHome;