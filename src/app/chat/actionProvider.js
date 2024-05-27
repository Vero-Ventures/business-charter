class ActionProvider {
    constructor(createChatBotMessage, setChatMessages) {
        this.createChatBotMessage = createChatBotMessage;
        this.setChatMessages = setChatMessages;
        this.latestUserMessage = null;
    }
    handleMessage = async (message) => {
        console.log("handleMessage called with message:", message); // Debug log
        if (message.toLowerCase() === 'start') {
            await this.handleStart();
        } else if (message.toLowerCase() === 'exit') {
            this.handleExit();
        } else {
            await this.handleGeneralMessage(message);
        }
    };

    handleStart = async () => {
        const questions = [
            "What questions help guide your family's decision-making?",
            'What are your family values?',
            'What is a statement or commitment that your family lives by?',
            "What statement defines your family's vision?",
            "What is your family's impact statement?",
        ];

        for (const question of questions) {
            const botMessage = this.createChatBotMessage(question);
            console.log("Adding bot message to state:", botMessage); // Debug log
            this.setChatMessages(prevMessages => [...prevMessages, botMessage]);

            const userResponse = await this.waitForUserResponse();
            console.log("User responded with:", userResponse); // Debug log
            const friendlyMessage = await this.sendMessageToAPI(userResponse);
            const botReply = this.createChatBotMessage(friendlyMessage);

            this.setChatMessages(prevMessages => [...prevMessages, botReply]);
            console.log("Initial messages set:", this.createChatBotMessage(question));
        }
    };

    handleExit = () => {
        const botMessage = this.createChatBotMessage('Goodbye!');
        console.log("Adding exit message to state:", botMessage); // Debug log
        this.setChatMessages(prevMessages => [...prevMessages, botMessage]);
    };

    handleGeneralMessage = async (message) => {
        const response = await this.sendMessageToAPI(message);
        const botMessage = this.createChatBotMessage(response);
        console.log("Adding general message to state:", botMessage); // Debug log
        this.setChatMessages(prevMessages => [...prevMessages, botMessage]);
    };

    sendMessageToAPI = async (message) => {
        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            const text = await response.text(); // Get response body as text
            console.log("HTTP Status:", response.status);
            console.log("Response Body:", text);

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            // Attempt to parse text as JSON
            const data = JSON.parse(text);
            console.log("Parsed JSON:", data);
            return data;
        } catch (error) {
            console.error("Error during fetch or parsing:", error);
        }
    };

    waitForUserResponse = () => new Promise((resolve) => {
        const interval = setInterval(() => {
            // console.log("Checking for user response:", this.latestUserMessage);  // Additional logging
            if (this.latestUserMessage) {
                console.log("User responded with:", this.latestUserMessage); 
                clearInterval(interval);
                resolve(this.latestUserMessage);
                this.latestUserMessage = null;
            }
        }, 500);
    });

    setLatestUserMessage = (message) => {
        console.log("Attempting to set latest user message:", message);
        this.latestUserMessage = message;
        console.log("Latest user message now set to:", this.latestUserMessage);
    };    
}

export default ActionProvider;
