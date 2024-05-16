class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleGreet() {
    const message = this.createChatBotMessage('Hello! How can I assist you?');
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  // Add more handlers for specific user interactions...
}

export default ActionProvider;
