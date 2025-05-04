import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am MediChain Assistant. How can I help you today? 😊' }
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);

    try {
      const res = await axios.post('/api/chatbot', {
        message: userInput
      });

      setMessages([...newMessages, { sender: 'bot', text: res.data.response }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Something went wrong. Try again later.' }]);
    }

    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header" onClick={toggleChat}>
          💬 MediChain Assistant
        </div>
        <div className="chatbot-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <div className="chatbot-toggle" onClick={toggleChat}>
        💬
      </div>
    </div>
  );
};

export default ChatBot;
