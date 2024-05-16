import { createChatBotMessage } from 'react-chatbot-kit';

const chatbotConfig = {
  botName: 'MyBot',
  initialMessages: [createChatBotMessage('Hi! How can I help you today?')],
  // Add more configuration options here...
};

export default chatbotConfig;
