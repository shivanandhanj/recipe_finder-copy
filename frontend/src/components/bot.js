import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import "../styles/Chatbot.css";
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleChatSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:7000/query', { query: chatInput });
        setChatResponse(response.data.answer);
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
    }
};


  
 

  return (
    <div className="chatbot-container">
      <div className="chatbot-icon" onClick={toggleChat}>
        <FaComments size={30} color="white" />
      </div>

      {isOpen && (
        <div className="chatbot-popup chatbot-expanded">
             <button onClick={toggleChat} className="close-button">✖</button> {/* Close button */}
         
          <h2>Ask the Recipe Chatbot</h2>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask a question about recipes..."
            className="chatbot-input"
          />
          <button onClick={handleChatSubmit} className="chatbot-submit">
            Submit
          </button>
          {chatResponse && (
            <p className="chat-response">
              Answer: {chatResponse}{" "}
              
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
