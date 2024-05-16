"use client";

import React, { useState, useEffect, FC } from 'react';
import Chatbot from 'react-chatbot-kit';
// import 'react-chatbot-kit/build/main.css';
// import './chatbotStyles.css';
import config from './config';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import { setChatbotSize } from './utils';

const ChatbotComponent: FC = () => {
  const [chatState, setChatState] = useState<any>({}); // Define your state structure as needed

  useEffect(() => {
    setChatbotSize();
    window.addEventListener('resize', setChatbotSize);
    return () => {
      window.removeEventListener('resize', setChatbotSize);
    };
  }, []);

  return (
    <div>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
};

export default ChatbotComponent;

