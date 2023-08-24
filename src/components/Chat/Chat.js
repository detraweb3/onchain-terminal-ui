import React from "react";
import "./Chat.css";

const Chat = ({ toggleMessageWindow }) => {
  return (
    <div className="message-window">
      <div
        className="message-header"
        onClick={() => {
          toggleMessageWindow();
        }}
      >
        <p>Chat</p>
      </div>
      <div className="message-list">
        {/* Render your messages here */}
        <div className="message">
          <p>User 1: Hello!</p>
        </div>
        <div className="message">
          <p>User 2: Hi there!</p>
        </div>
        {/* Add more messages as needed */}
      </div>
      <div className="message-input">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chat;
