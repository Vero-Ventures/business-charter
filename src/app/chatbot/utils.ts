// utils.ts

// Function to set the chatbot size
export const setChatbotSize = (): void => {
    const chatbot = document.querySelector<HTMLDivElement>(".react-chatbot-kit-chat-inner-container");
    if (chatbot) {
      // Adjust the chatbot container styles
      chatbot.style.width = "100vw";
      chatbot.style.height = "95%";
      chatbot.style.maxHeight = "100%";
      chatbot.style.position = "fixed";
      chatbot.style.marginTop = "5vh";
      chatbot.style.top = "0";
      chatbot.style.left = "0";
      chatbot.style.zIndex = "1000";
      chatbot.style.overflow = "hidden";
  
      // Adjust the message container
      const messageContainer = chatbot.querySelector<HTMLDivElement>(".react-chatbot-kit-chat-message-container");
      if (messageContainer) {
        messageContainer.style.height = "calc(100% - 60px)";
        messageContainer.style.flexGrow = "1";
        messageContainer.style.overflowY = "auto";
        messageContainer.style.display = "flex";
        messageContainer.style.flexDirection = "column";
        messageContainer.style.justifyContent = "flex-end";
      }
  
      // Adjust the input container
      const botMessageContainer = chatbot.querySelector<HTMLDivElement>(".react-chatbot-kit-chat-bot-message-container");
      const chatInput = botMessageContainer?.querySelector<HTMLInputElement>(".react-chatbot-kit-chat-input");
      if (chatInput) {
        chatInput.style.flexShrink = "0";
        chatInput.style.height = "50px";
        chatInput.style.width = "100%";
        chatInput.style.boxSizing = "border-box";
        chatInput.style.maxWidth = "100%";
        chatInput.style.position = "fixed";
        chatInput.style.bottom = "0";
        chatInput.style.left = "0";
        chatInput.style.zIndex = "1000";
  
        // Focus event to scroll to bottom
        chatInput.addEventListener("focus", () => setTimeout(scrollToBottom, 300));
      }
    }
  };
  
  // Function to scroll to the bottom of the chat
  export const scrollToBottom = (): void => {
    const messageContainer = document.querySelector<HTMLDivElement>(".react-chatbot-kit-chat-message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };
  