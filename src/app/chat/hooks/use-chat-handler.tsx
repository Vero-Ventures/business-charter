import { useState, useCallback, useContext, useMemo, useEffect } from 'react';
import { ChatbotUIContext } from '@/app/chat/context';
import ActionProvider from '@/app/chat/actionProvider';  

export const useChatHandler = () => {
    const { chatMessages, setChatMessages } = useContext(ChatbotUIContext);
    const [chatInput, setChatInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const createChatBotMessage = useCallback((message) => ({
        type: 'bot',
        text: message
    }), []);

    const actionProvider = useMemo(() => new ActionProvider(
        createChatBotMessage,
        (update) => {
            setChatMessages(prev => [...prev, ...(update.messages || [])]);
        }
    ), [setChatMessages, createChatBotMessage]);

    // Handling new chat sessions
    const handleNewChat = useCallback(() => {
        setChatMessages([]); // Resetting the chat messages
        actionProvider.handleStart(); // Assuming handleStart initializes a new chat session
    }, [setChatMessages, actionProvider]);

    // Handling focus on chat input
    const handleFocusChatInput = useCallback(() => {
        const inputElement = document.getElementById('chat-input');
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    const handleSendMessage = useCallback(async (message) => {
        setIsGenerating(true);
        try {
            await actionProvider.handleMessage(message);
        } catch (error) {
            console.error("Failed to handle message:", error);
        }
        setIsGenerating(false);
    }, [actionProvider]);

    useEffect(() => {
        actionProvider.handleStart(); // Automatically start the conversation
    }, [actionProvider]);

    return {
        chatMessages,
        chatInput,
        setChatInput,
        handleSendMessage,
        handleExitConversation: actionProvider.handleExit, // Assuming handleExit is defined on actionProvider
        handleNewChat,
        handleFocusChatInput,
        isGenerating,
    };
};
