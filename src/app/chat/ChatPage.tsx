// src/app/api/chat/ChatPage.tsx
"use client";

import { useState, useContext, useEffect } from 'react';
import { ChatbotUIContext, ChatbotUIProvider } from '@/app/chat/context';
import { useChatHandler } from '@/app/chat/hooks/use-chat-handler';
import { ChatUI } from '@/app/chat/chat-ui';
import useHotkey from '@/lib/hooks/use-hotkey';

const ChatPage = () => {
    const { chatMessages } = useContext(ChatbotUIContext);
    const { handleNewChat } = useChatHandler();
    const [chatStarted, setChatStarted] = useState(false);

    useHotkey("o", handleNewChat);

    useEffect(() => {
        console.log("Chat messages changed:", chatMessages.map(m => m.message));

        const lastMessageText = chatMessages[chatMessages.length - 1]?.message?.toLowerCase() ?? "";

        console.log("Last message text:", lastMessageText);

        if (!chatStarted && lastMessageText === "start") {
            console.log("Start conditions met. Starting chat.");
            setChatStarted(true);
        }
    }, [chatMessages, chatStarted]);

    console.log("Rendering ChatPage, Chat Started:", chatStarted);

    return (
        <ChatbotUIProvider>
            <ChatUI />
        </ChatbotUIProvider>
    );
};

export default ChatPage;
