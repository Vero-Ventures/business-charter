
import React, { useContext, useEffect, useRef } from 'react';
import { ChatbotUIContext } from '@/app/chat/context'; 
import { Message } from '@/app/chat/message';

export const ChatMessages = () => {
    const { chatMessages } = useContext(ChatbotUIContext);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        console.log("Updated messages:", chatMessages)
    }, [chatMessages]);

    // return (
    //     <div className="chat-messages-container">
    //         {chatMessages.map((msg, index) => (
    //             <div key={index} className="message">
    //                 <p>{msg.message}</p>
    //             </div>
    //         ))}
    //         <div ref={messagesEndRef} />
    //     </div>
    // );
    return (
        <div className="chat-messages">
            {chatMessages.map((msg, index) => {
                console.log("Rendering message:", msg);
                return (
                    <Message
                        key={msg.id}
                        message={msg}
                        fileItems={msg.fileItems || []}
                        isEditing={false}  // Assuming default values, adjust as necessary
                        isLast={index === chatMessages.length - 1}
                        onStartEdit={() => {}}
                        onCancelEdit={() => {}}
                        onSubmitEdit={(newContent) => {
                            console.log("Edit submitted:", newContent);
                            // Update logic here
                        }}
                    />
                );
            })}
        </div>
    );
};
