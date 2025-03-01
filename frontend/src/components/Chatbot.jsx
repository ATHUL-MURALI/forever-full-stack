import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css"; // Make sure to create a CSS file for styles

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState(""); // Store user's message
  const [messages, setMessages] = useState([]); // Store all messages (user and bot)
  const [isChatOpen, setIsChatOpen] = useState(false); // Track chat open/close state
  const chatbotRef = useRef(null); // Ref to detect outside clicks

  // Handle changes in user message input
  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  // Send message to backend and update chat
  const sendMessage = async () => {
    if (!userMessage) return; // Do nothing if the message is empty

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userMessage },
    ]);
    setUserMessage(""); // Clear the input

    try {
      // Send the message to the backend API
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const data = await response.json(); // Get the response from the backend

      // Add the bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", text: data.response },
      ]);
    } catch (error) {
      // Handle errors (if any)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", text: "Error: Could not retrieve response" },
      ]);
    }
  };

  // Close the chatbot if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsChatOpen(false); // Close the chat when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on component unmount
    };
  }, []);

  return (
    <div
      ref={chatbotRef}
      className={`chat-container ${isChatOpen ? "open" : "closed"}`}
    >
      <div
        className="chat-header"
        onClick={() => setIsChatOpen((prev) => !prev)} // Toggle chat open/close on header click
      >
        <span>{isChatOpen ? "Reality Chatbot" : "Chat"}</span>
      </div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      {isChatOpen && (
        <div className="input-container">
          <input
            type="text"
            value={userMessage}
            onChange={handleUserMessageChange}
            placeholder="Type your message here"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
