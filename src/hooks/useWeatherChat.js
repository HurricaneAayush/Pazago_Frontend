import { useState, useCallback, useRef, useEffect } from 'react';
import { sendMessageToWeatherAgent } from '../services/weatherApi';

export const useWeatherChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    const agentMsgId = Date.now() + 1;
    const agentMsg = {
      id: agentMsgId,
      role: 'agent',
      content: '',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, agentMsg]);

    try {
      let fullResponse = '';

      await sendMessageToWeatherAgent(userMessage, (chunk) => {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === agentMsgId ? { ...msg, content: fullResponse } : msg
          )
        );
      });
    } catch (err) {
      console.error(err);
      setError('Failed to get response. Please try again.');

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === agentMsgId
            ? {
                ...msg,
                content: 'Sorry, I encountered an error. Please try again.',
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    messagesEndRef,
  };
};
