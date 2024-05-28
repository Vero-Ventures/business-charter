import { useState, useCallback, useContext, useEffect } from 'react';
import { ChatbotUIContext } from '@/app/chat/context';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

const questions = [
    "Enter up to three questions that guide your family's decision making.",
    "What are your family values?",
    "What is a statement or commitment that your family lives by?",
    "What statement defines your family's vision?",
    "What is your family's impact statement?",
];

export const useChatHandler = () => {
    const { chatMessages, setChatMessages } = useContext(ChatbotUIContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [questionsCompleted, setQuestionsCompleted] = useState(false);
    const [responses, setResponses] = useState({});
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (data?.session?.user) {
                setUserId(data.session.user.id);
                console.log('User data:', data.session.user.id);
            } else {
                setUserId(null); // Ensure to set to null if there is no user
                console.error('No user data:', error);
            }
        };

        getSession();
    }, []);

    // Helper function to create chat messages
    const createChatBotMessage = useCallback((text, messageType) => {
        const id = uuidv4();
        return { id, type: messageType, message: text };
    }, []);

    // Function to add messages to the chat
    const addMessage = useCallback((message) => {
        setChatMessages(prevMessages => [...prevMessages, message]);
    }, [setChatMessages]);

    // Function to handle the current question
    const handleQuestions = useCallback(() => {
        if (currentQuestionIndex < questions.length) {
            const message = createChatBotMessage(questions[currentQuestionIndex], 'bot');
            addMessage(message);
            setCurrentQuestionIndex(current => current + 1);
        } else {
            addMessage(createChatBotMessage("You may type exit to finish creating your charter.", 'bot'));
            setQuestionsCompleted(true);
        }
    }, [addMessage, createChatBotMessage, currentQuestionIndex]);

    // Function to submit all responses
    const submitResponses = useCallback(async () => {
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/chat/submit_responses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ responses, userId }),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const result = await response.json();
            console.log("Responses submitted successfully:", result);
        } catch (error) {
            console.error("Failed to submit responses:", error);
        }
    }, [responses, userId]);

    // Function to send a message to the API
    const sendMessageToAPI = useCallback(async (message) => {
        try {
            const response = await fetch('http://localhost:8000/api/chat/send_message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
                credentials: 'include'
            });
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const result = await response.json();
            return result.answer;
        } catch (error) {
            console.error("Error during fetch or parsing:", error);
            return "Sorry, there was an error processing your message.";
        }
    }, []);

    // Main function to handle sending messages
    const handleSendMessage = useCallback(async (messageText) => {
        setIsGenerating(true);
        const normalizedText = messageText.trim().toLowerCase();
        try {
            const message = createChatBotMessage(messageText, 'user');
            addMessage(message);

            if (normalizedText === "start" && currentQuestionIndex === 0) {
                handleQuestions();
            } else if (normalizedText === "exit" && questionsCompleted) {
                await submitResponses();
                setChatMessages([]);
                setCurrentQuestionIndex(0);
                setQuestionsCompleted(false);
                addMessage(createChatBotMessage("Thank you, I have recorded your responses. Goodbye!", 'bot'));
            } else if (currentQuestionIndex > 0 && currentQuestionIndex <= questions.length) {
                responses[questions[currentQuestionIndex - 1]] = messageText;
                handleQuestions();
            } else {
                const apiResponse = await sendMessageToAPI(messageText);
                addMessage(createChatBotMessage(apiResponse, 'bot'));
            }
        } finally {
            setIsGenerating(false);
        }
    }, [addMessage, createChatBotMessage, setChatMessages, handleQuestions, sendMessageToAPI, submitResponses, currentQuestionIndex, questionsCompleted, responses]);

    // Function to reset the chat for a new session
    const handleNewChat = useCallback(() => {
        setChatMessages([]);
        setCurrentQuestionIndex(0);
        setQuestionsCompleted(false);
        setResponses({});
    }, [setChatMessages]);

    return {
        chatMessages,
        handleSendMessage,
        handleNewChat,
        isGenerating,
    };
};
