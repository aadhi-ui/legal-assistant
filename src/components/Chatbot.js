import React, { useState } from 'react';
import { logChatMessage } from '../services/api';
import TranslatableText from './TranslatableText';
import styles from './Chatbot.module.css';

const Chatbot = ({ isOpen: controlledOpen, onOpen, onClose }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const open = () => (onOpen ? onOpen() : setUncontrolledOpen(true));
  const close = () => (onClose ? onClose() : setUncontrolledOpen(false));

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your legal assistant. How can I help you today?", type: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const quickReplies = [
    "Property Rights",
    "Consumer complaints", 
    "Labor laws"
  ];

  const handleQuickReply = async (query) => {
    const userMessage = { id: Date.now(), text: query, type: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    await logChatMessage(query);

    setTimeout(() => {
      const botMessage = { 
        id: Date.now() + 1, 
        text: "For detailed help, please explore our services or consult a lawyer.", 
        type: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { id: Date.now(), text: userInput, type: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    await logChatMessage(userInput);

    setTimeout(() => {
      const botMessage = { 
        id: Date.now() + 1, 
        text: "For detailed help, please explore our services or consult a lawyer.", 
        type: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);

    setUserInput('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div>
      {/* Floating Copilot-style button */}
      <div className={styles.chatbotContainer}>
        <button 
          className={styles.chatbotToggle}
          onClick={open}
        >
          <i className="fas fa-robot"></i>
          <span><TranslatableText text="Legal Assistant" /></span>
        </button>
      </div>

      {/* Side Panel Overlay */}
      {isOpen && (
        <div className={styles.panelOverlay} onClick={handleOverlayClick}>
          <aside className={styles.sidePanel}>
            <div className={styles.chatbotHeader}>
              <h3><TranslatableText text="Legal Assistant" /></h3>
              <button 
                className={styles.closeButton}
                onClick={close}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`${styles.message} ${styles[message.type]}`}
                >
                  <TranslatableText text={message.text} />
                </div>
              ))}
              
              {isLoading && (
                <div className={`${styles.message} ${styles.bot} ${styles.loading}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className={styles.quickReplies}>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className={styles.quickReplyButton}
                    onClick={() => handleQuickReply(reply)}
                  >
                    <TranslatableText text={reply} />
                  </button>
                ))}
              </div>
            )}

            <form className={styles.inputForm} onSubmit={handleSubmit}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a legal question..."
                className={styles.input}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={styles.sendButton}
                disabled={isLoading || !userInput.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
