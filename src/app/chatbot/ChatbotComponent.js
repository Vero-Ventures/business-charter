'use client';

import React, { useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
// import './chatbotStyles.css'; // Import the CSS styles

import chatbotConfig from './chatbotConfig';
import ActionProvider from './actionProvider';
import MessageParser from './messageParser';
import { setChatbotSize } from './utils'; // Import the JavaScript function
// import { adjustForKeyboard } from './utils';

// Custom header component
const CustomHeader = () => (
  <div style={{ backgroundColor: 'blue', color: 'red', padding: '10px' }}>
    My Custom Header
  </div>
);

const ChatbotComponent = () => {
  useEffect(() => {
    setChatbotSize();
    // adjustForKeyboard();
    window.addEventListener('resize', setChatbotSize);

    return () => window.removeEventListener('resize', setChatbotSize);
  }, []);

  return (
    <Chatbot
      config={chatbotConfig}
      actionProvider={ActionProvider}
      messageParser={MessageParser}
      headerText=" "
      // headerComponent={CustomHeader()}
    />
  );
};

export default ChatbotComponent;
