
import React, { useContext, useEffect, useRef } from 'react';
import { ChatbotUIContext } from '@/app/chat/context'; 

export const ChatMessages = () => {
    const { chatMessages } = useContext(ChatbotUIContext);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        console.log("Updated messages:", chatMessages)
    }, [chatMessages]);

    return (
        <div className="chat-messages-container">
            {chatMessages.map((msg, index) => (
                <div key={index} className="message">
                    <p>{msg.message}</p>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};
