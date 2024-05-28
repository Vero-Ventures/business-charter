import { useState, useCallback, useContext, useEffect } from 'react';
import { ChatbotUIContext } from '@/app/chat/context';
import { ChatMessage } from '@/app/chat/types/types';

const questions = [
    "Enter up to three questions that guide your family’s decision making.",
    "What are your family values?",
    "What is a statement or commitment that your family lives by?",
    "What statement defines your family's vision?",
    "What is your family's impact statement?",
];

export const useChatHandler = () => {
    const { chatMessages, setChatMessages } = useContext(ChatbotUIContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    const createChatBotMessage = useCallback((text, messageType): ChatMessage => {
        return {
            id: Date.now().toString(),
            type: messageType,
            message: text
        };
    }, []);

    // Initialize chat with a welcome message
    useEffect(() => {
        const welcomeMessage = createChatBotMessage("Welcome to Videre Chatbot!", 'bot');
        setChatMessages([welcomeMessage]);
    }, [createChatBotMessage, setChatMessages]);

    const sendMessageToAPI = useCallback(async (message) => {
        if (['start', 'exit'].includes(message.toLowerCase())) {
            console.log("Control message received, not sending to API:", message);
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const { answer } = await response.json();
            return answer;
        } catch (error) {
            console.error("Error during fetch or parsing:", error);
        }
    }, []);

    const handleGeneralMessage = useCallback(async (message) => {
        const response = await sendMessageToAPI(message);
        if(response) {
            const botMessage = createChatBotMessage(response, 'bot');
            setChatMessages(prev => [...prev, botMessage]);
        }
    }, [sendMessageToAPI, createChatBotMessage, setChatMessages]);

    const handleStart = useCallback(() => {
        if (currentQuestionIndex < questions.length) {
            const message = createChatBotMessage(questions[currentQuestionIndex], 'bot');
            setChatMessages(prevMessages => [...prevMessages, message]);
            setCurrentQuestionIndex(current => current + 1);
        }
    }, [createChatBotMessage, currentQuestionIndex, setChatMessages]);


    const handleExit = useCallback(() => {
        const exitMessage = createChatBotMessage("Goodbye!", "bot");
        setChatMessages(prev => [...prev, exitMessage]);
    }, [createChatBotMessage, setChatMessages]);

    const handleSendMessage = useCallback(async (messageText: string) => {
        setIsGenerating(true);
        try {
            const message: ChatMessage = createChatBotMessage(messageText, 'user');
            setChatMessages(prev => {
                console.log("Adding message:", message);  // Log to confirm message is being added
                return [...prev, message];
            });
        
            if (messageText.trim().toLowerCase() === "start" && currentQuestionIndex === 0) {
                handleStart();
            } else if (messageText.trim().toLowerCase() === "exit") {
                handleExit();
            } else {
                await handleGeneralMessage(messageText);
            }
        } catch (error) {
            console.error("Failed to handle message:", error);
        } finally {
            setIsGenerating(false);
        }
    }, [createChatBotMessage, handleStart, handleExit, handleGeneralMessage, setChatMessages, currentQuestionIndex]);

    const handleNewChat = useCallback(() => {
        setChatMessages([]);  // Clearing existing messages for new chat session
        setCurrentQuestionIndex(0);  // Reset question index
    }, [setChatMessages]);

    return {
        chatMessages,
        handleSendMessage,
        handleNewChat,
        handleStart,
        isGenerating,
    };
};
