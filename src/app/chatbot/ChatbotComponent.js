// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Chatbot from 'react-chatbot-kit';
// import 'react-chatbot-kit/build/main.css';
// import './chatbotCustomStyles.css';

// import chatbotConfig from './chatbotConfig';
// import ActionProvider from './actionProvider';
// import MessageParser from './messageParser';
// import { setChatbotSize, autoResizeInput } from './utils';

// // const CustomHeader = () => (
// //   <div style={{ backgroundColor: 'blue', color: 'red', padding: '10px' }}>
// //     My Custom Header
// //   </div>
// // );

// const ChatbotComponent = () => {
//   const textareaRef = useRef(null);
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async message => {
//     try {
//       const response = await fetch('http://localhost:5000/api/chat', {
//         // Update endpoint as needed
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message }),
//       });
//       const data = await response.json();
//       if (data.error) {
//         console.error('Error:', data.error);
//       } else {
//         const newMessage = { type: 'bot', text: data.answer };
//         setMessages([...messages, newMessage]);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleSendMessage = event => {
//     if (event.key === 'Enter') {
//       const userMessage = event.target.value;
//       if (userMessage.trim()) {
//         setMessages([...messages, { type: 'user', text: userMessage }]);
//         sendMessage(userMessage);
//         event.target.value = '';
//       }
//     }
//   };

//   useEffect(() => {
//     setChatbotSize();
//     window.addEventListener('resize', setChatbotSize);

//     return () => window.removeEventListener('resize', setChatbotSize);
//   }, []);

//   useEffect(() => {
//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.addEventListener('input', autoResizeInput);
//       return () => textarea.removeEventListener('input', autoResizeInput);
//     }
//   }, []);

//   return (
//     <div>
//       <Chatbot
//         config={chatbotConfig}
//         actionProvider={ActionProvider}
//         messageParser={MessageParser}
//         headerText=" "
//         inputRef={textareaRef}
//       />
//       <div className="chat-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.type}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <textarea
//         ref={textareaRef}
//         className="react-chatbot-kit-chat-input"
//         placeholder="Type a message..."
//         onKeyDown={handleSendMessage}
//       />
//     </div>
//   );
// };

// export default ChatbotComponent;

// ChatbotComponent.js

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './chatbotCustomStyles.css';

import chatbotConfig from './chatbotConfig';
import ActionProvider from './actionProvider';
import MessageParser from './messageParser';
import { setChatbotSize, autoResizeInput } from './utils';
// import CustomHeader from './CustomHeader'; // Import the custom header
import CustomHeader from './CustomHeader';

const ChatbotComponent = () => {
  const textareaRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const sendMessage = async message => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        // Update endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        const newMessage = { type: 'bot', text: data.answer };
        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSendMessage = event => {
    if (event.key === 'Enter') {
      const userMessage = event.target.value;
      if (userMessage.trim()) {
        setMessages([...messages, { type: 'user', text: userMessage }]);
        sendMessage(userMessage);
        event.target.value = '';
      }
    }
  };

  useEffect(() => {
    setChatbotSize();
    window.addEventListener('resize', setChatbotSize);

    return () => window.removeEventListener('resize', setChatbotSize);
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('input', autoResizeInput);
      return () => textarea.removeEventListener('input', autoResizeInput);
    }
  }, []);

  return (
    <div>
      <div>
        <CustomHeader />
      </div>
      <Chatbot
        config={chatbotConfig}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        // headerComponent={<CustomHeader />} // Use the custom header
        headerText=" "
        inputRef={textareaRef}
      />
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="react-chatbot-kit-chat-input"
        placeholder="Type a message..."
        onKeyDown={handleSendMessage}
      />
    </div>
  );
};

export default ChatbotComponent;
