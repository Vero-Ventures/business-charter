import React, { useEffect, useRef } from 'react';
import { useChatbotUI } from '@/app/chat/context';
import { AiOutlineOpenAI } from "react-icons/ai";
import './styles.css';

export const ChatMessages = () => {
    const { chatMessages } = useChatbotUI();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages]);

    return (
        <div className="chat-container">
            {chatMessages.map((msg, index) => (
                <div key={msg.id || index} className={`message ${msg.type === 'bot' ? 'bot-message' : 'user-message'}`}>
                    {msg.type === 'bot' && (
                        <div className="bot-content">
                            <div className="bot-icon">
                                <AiOutlineOpenAI size={35} />
                            </div>
                            <div className="bot-text">
                                {msg.message}
                            </div>
                        </div>
                    )}
                    {msg.type !== 'bot' && (
                        <div className="user-text">
                            {msg.message}
                        </div>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};
