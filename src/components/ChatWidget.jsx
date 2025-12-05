import React, { useState } from 'react';
import '../assets/styles/ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Bonjour 👋 Je suis RebootBot. Pose-moi une question sur NIRD ou la résistance numérique !",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    // Ajoute le message utilisateur
    setMessages(prev => [...prev, { from: 'user', text: question }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }), // { "question": "..." }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json(); // { question: "...", answer: "..." }

      setMessages(prev => [
        ...prev,
        { from: 'bot', text: data.answer || "Je n'ai pas compris la réponse du serveur." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: "Oups, une erreur s'est produite côté serveur." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-title">
              RebootBot 🤖
              <span className="chat-subtitle">Assistant du village NIRD</span>
            </div>
            <button
              className="chat-close"
              onClick={toggleChat}
              aria-label="Fermer la fenêtre de chat"
            >
              ×
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  'chat-message ' +
                  (msg.from === 'bot' ? 'chat-message-bot' : 'chat-message-user')
                }
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-message chat-message-bot">
                …
              </div>
            )}
          </div>

          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Écris ton message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="chat-send"
              type="submit"
              aria-label="Envoyer"
              disabled={loading}
            >
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        className="chat-toggle-btn"
        onClick={toggleChat}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        {!isOpen ? (
          <span className="chat-icon">💬</span>
        ) : (
          <span className="chat-icon-close">×</span>
        )}
      </button>
    </>
  );
};

export default ChatWidget;
