import React from 'react';
import { useWeatherChat } from '../hooks/useWeatherChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatInterface.css';

const ChatInterface = () => {
  const { messages, isLoading, error, sendMessage, clearChat, messagesEndRef } =
    useWeatherChat();

  return (
    <div className="chat-root">
      <div className="chat-container">
        <header className="chat-header">
          <div className="chat-header-left">
            {messages.length > 0 && (
            <button className="clear-button" onClick={clearChat}>
              Clear chat
            </button>
          )}
            <div className="chat-logo">☁️</div>
            <div>
              <h1 className="chat-title">Weather Agent</h1>
              <p className="chat-subtitle">Ask me about weather anywhere</p>
            </div>
          </div>
          
        </header>

        {error && <div className="error-banner">{error}</div>}

        <MessageList
          messages={messages}
          messagesEndRef={messagesEndRef}
          isLoading={isLoading}
        />

        <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
