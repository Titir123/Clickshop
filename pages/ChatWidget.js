// components/ChatWidget.js
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/ChatWidget.module.css';

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: 'Hello! How can I help you with our products today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
console.log(data);

      const botResponse = {
        role: 'bot',
       content: data.chat_response ,
products: Array.isArray(data.products) && data.products.length > 0 ? data.products : null,

        products: data.products || null,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Sorry, there was an error processing your request',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.chatWidget} ${isOpen ? styles.open : ''}`}>
      <div className={styles.chatHeader} onClick={() => setIsOpen(!isOpen)}>
        <h3>Customer Support</h3>
        <span>{isOpen ? '−' : '+'}</span>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
              <div className={styles.messageContent}>
                <p>{msg.content}</p>
                
                {msg.products && (
                  <div className={styles.products}>
                    <h4>Products:</h4>
                    <ul>
                      {msg.products.map((product, i) => (
                        <li key={i}>
                          <strong>{product.title}</strong> - ${product.price}
                          <div>Rating: {product.rating?.rate || 'N/A'}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={styles.messageTime}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading}>
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;