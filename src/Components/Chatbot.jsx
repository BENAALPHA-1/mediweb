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

  // Voice recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = (event) => {
      alert('Voice recognition error: ' + event.error);
    };

    const micBtn = document.getElementById('mic-btn');
    const handleMicStart = () => {
      recognition.start();
    };

    if (micBtn) {
      micBtn.addEventListener('click', handleMicStart);
    }

    return () => {
      if (micBtn) {
        micBtn.removeEventListener('click', handleMicStart);
      }
      recognition.abort();
    };
  }, [sendMessage]);

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
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <div className="chatbot-buttons">
            <button onClick={() => sendMessage()}>Send</button>
            <button id="mic-btn">🎤</button>
          </div>
        </div>
      </div>

      <div className="chatbot-toggle" onClick={toggleChat}>
        💬
      </div>
    </div>
  );
};

export default ChatBot;
