// MessageParser.ts

export default class MessageParser {
    actionProvider: any;
  
    constructor(actionProvider: any) {
      this.actionProvider = actionProvider;
    }
  
    parse(message: string) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("hello")) {
        this.actionProvider.greet();
      }
      // Add more conditions for other messages
    }
  }
  