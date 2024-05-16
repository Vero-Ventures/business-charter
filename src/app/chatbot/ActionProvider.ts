// ActionProvider.ts
import { createChatBotMessage } from 'react-chatbot-kit';

export default class ActionProvider {
  setState: Function;

  constructor(setState: Function) {
    this.setState = setState;
  }

  greet() {
    // You can pass an empty object if no additional configuration is needed
    const greetingMessage = createChatBotMessage("Hello, nice to meet you!", {});

    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, greetingMessage]
    }));
  }

  // Define other methods for different actions
}
