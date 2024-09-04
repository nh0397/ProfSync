import React, { useState } from 'react';
import './Chatbot.css';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Chatbot = ({ theme }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello Welcome to ProfSync! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    
  };

  return (
    <div className={`chatbot-container ${theme}`}>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.from}`}>
            <div className={`message ${msg.from}`}>
              {msg.from === 'bot' ? <SmartToyIcon className="icon" /> : <PersonIcon className="icon" />}
              <div className="message-content">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
