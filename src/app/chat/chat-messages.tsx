// import React, { useContext, useEffect, useRef } from 'react';
// import { ChatbotUIContext } from '@/app/chat/context'; 
// import { ChatMessage } from '@/app/chat/types/types'; // Adjust imports
// import { Message as MessageComponent } from '@/app/chat/message';

// export const ChatMessages = () => {
//     const { chatMessages, setChatMessages } = useContext(ChatbotUIContext);
//     const messagesEndRef = useRef<null | HTMLDivElement>(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         console.log("Updated messages:", chatMessages);
//         scrollToBottom();
//     }, [chatMessages]);

//     const addTestMessage = () => {
//         const newMessage: ChatMessage = {
//             id: Date.now().toString(), // Ensure ID is a string
//             user: "System",
//             bot: "Bot",
//             message: "Test message",
//             fileItems: []
//         };
//         setChatMessages(prev => [...prev, newMessage]);
//     };

//     return (
//         <div>
//             <button onClick={addTestMessage}>Add Test Message</button>
//             <div className="chat-messages-container overflow-y-auto p-4">
//                 {chatMessages.map((message, index) => (
//                     <MessageComponent
//                         key={message.id}
//                         message={{
//                             assistant_id: null,
//                             chat_id: "some_chat_id",
//                             content: message.message,
//                             created_at: new Date().toISOString(),
//                             id: message.id,
//                             image_paths: [],
//                             model: "default_model",
//                             role: "user",
//                             sequence_number: index,
//                             updated_at: null,
//                             user_id: "default_user"
//                         }}
//                         fileItems={message.fileItems}
//                         isEditing={false} // This should be part of the props to MessageComponent if needed
//                         isLast={index === chatMessages.length - 1}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
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
