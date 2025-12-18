import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  const isUser = message.role === 'user';

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className={`message-row ${isUser ? 'message-row--user' : 'message-row--agent'}`}>
      <div className="message-bubble-wrapper">
        <div className={`message-bubble ${isUser ? 'message-bubble--user' : 'message-bubble--agent'}`}>
          <p className="message-text">{message.content}</p>
        </div>
        <div className={`message-time ${isUser ? 'message-time--user' : 'message-time--agent'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;
