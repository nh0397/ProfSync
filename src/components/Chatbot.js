import React, { useState } from 'react';
import './Chatbot.css';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Chatbot = ({ theme }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! Welcome to ProfSync! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add the user's message to the messages list
    const userMessage = { from: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      setIsStreaming(true);

      // Use the environment variable for the API URL
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Add the bot's response to the messages
      const botMessage = { from: 'bot', text: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      setIsStreaming(false);
    } catch (error) {
      console.error('Error fetching from API:', error);
      setIsStreaming(false);
    }
  };

  return (
    <div className={`chatbot-container ${theme}`}>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.from}`}>
            <div className={`message ${msg.from}`}>
              {msg.from === 'bot' ? <SmartToyIcon className="icon" /> : <PersonIcon className="icon" />}
              <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.text }}/>
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
          disabled={isStreaming} // Disable input while streaming
        />
        <button onClick={handleSend} disabled={isStreaming}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
