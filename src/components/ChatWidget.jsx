import React, { useState } from 'react';
import '../assets/styles/ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

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
            <div className="chat-message chat-message-bot">
              Bonjour 👋 Je suis RebootBot.  
              Pose-moi une question sur NIRD ou la résistance numérique !
            </div>
            {/* Tu pourras ensuite mapper ici une liste de messages */}
          </div>

          <form
            className="chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: envoyer le message à ton backend / logique de bot
            }}
          >
            <input
              type="text"
              className="chat-input"
              placeholder="Écris ton message..."
            />
            <button className="chat-send" type="submit" aria-label="Envoyer">
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
