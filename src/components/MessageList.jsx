import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages, messagesEndRef, isLoading }) => {
  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="message-list-empty">
          <div className="empty-icon">💬</div>
          <h3 className="empty-title">Start a conversation</h3>
          <p className="empty-subtitle">Ask me about the weather in any city.</p>
        </div>
      ) : (
        <>
          {messages.map((m) => (
            <Message key={m.id} message={m} />
          ))}
          {isLoading && (
            <div className="typing-indicator-row">
              <div className="typing-indicator">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;
