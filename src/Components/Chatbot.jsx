import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am MediChain Assistant. How can I help you today? 😊' }
  ]);
  const [userInput, setUserInput] = useState('');
  const chatBodyRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  const sendMessage = useCallback(
    async (customInput = null) => {
      const input = customInput || userInput;
      if (!input.trim()) return;

      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);

      try {
        const res = await axios.post('https://benedictproject.pythonanywhere.com/api/chatbot', {
          message: input
        });

        setMessages([...newMessages, { sender: 'bot', text: res.data.response }]);
      } catch (err) {
        setMessages([...newMessages, { sender: 'bot', text: '⚠️ Something went wrong. Try again later.' }]);
      }

      setUserInput('');
    },
    [userInput, messages]
  );

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header" onClick={toggleChat}>
          💬 MediChain Assistant
        </div>

        <div className="chatbot-body" ref={chatBodyRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chatbot-footer">
          <textarea
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button onClick={() => sendMessage()} aria-label="Send message">
            ➤
          </button>
        </div>
      </div>

      <div className="chatbot-toggle" onClick={toggleChat} title="Toggle Chat">
        💬
      </div>
    </div>
  );
};

export default ChatBot;
