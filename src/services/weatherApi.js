// src/services/weatherApi.js
const API_URL = 'https://api-dev.provue.ai/api/webapp/agent/test-agent';

export const sendMessageToWeatherAgent = async (userMessage, onChunk) => {
  const requestBody = {
    prompt: userMessage,
    stream: false
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  });

  // log status to see problems
  console.log('API status:', response.status);

  if (!response.ok) {
    // this is what sends you into the catch in the hook
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('API data:', data);

  const text = data?.data?.response ?? 'No response from agent';

  // non‑streaming: just call once
  if (onChunk) {
    onChunk(text);
  }

  return text;
};
