// config.ts
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hello, what can I help you with today?", {})
  ],
  // Add other configuration settings here
};

export default config;
