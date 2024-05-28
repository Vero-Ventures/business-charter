import React, { useState, createContext, Dispatch, SetStateAction, ReactNode, FC } from 'react';
import { ChatMessage, ChatFile, MessageImage } from "@/app/chat/types/types";

interface ChatbotUIContextType {
    userInput: string;
    setUserInput: Dispatch<SetStateAction<string>>;
    chatMessages: ChatMessage[];
    setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;
    chatFileItems: ChatFile[];
    setChatFileItems: Dispatch<SetStateAction<ChatFile[]>>;

    abortController: AbortController | null;
    setAbortController: Dispatch<SetStateAction<AbortController | null>>;
    firstTokenReceived: boolean;
    setFirstTokenReceived: Dispatch<SetStateAction<boolean>>;
    isGenerating: boolean;
    setIsGenerating: Dispatch<SetStateAction<boolean>>;

    chatFiles: ChatFile[];
    setChatFiles: Dispatch<SetStateAction<ChatFile[]>>;
    chatImages: MessageImage[];
    setChatImages: Dispatch<SetStateAction<MessageImage[]>>;
    newMessageFiles: ChatFile[];
    setNewMessageFiles: Dispatch<SetStateAction<ChatFile[]>>;
    newMessageImages: MessageImage[];
    setNewMessageImages: Dispatch<SetStateAction<MessageImage[]>>;
    showFilesDisplay: boolean;
    setShowFilesDisplay: Dispatch<SetStateAction<boolean>>;

    useRetrieval: boolean;
    setUseRetrieval: Dispatch<SetStateAction<boolean>>;
    sourceCount: number;
    setSourceCount: Dispatch<SetStateAction<number>>;
}


export const ChatbotUIContext = createContext<ChatbotUIContextType>({
    userInput: "",
    setUserInput: () => {},
    chatMessages: [],
    setChatMessages: () => {},
    chatFileItems: [],
    setChatFileItems: () => {},

    abortController: null,
    setAbortController: () => {},
    firstTokenReceived: false,
    setFirstTokenReceived: () => {},
    isGenerating: false,
    setIsGenerating: () => {},

    chatFiles: [],
    setChatFiles: () => {},
    chatImages: [],
    setChatImages: () => {},
    newMessageFiles: [],
    setNewMessageFiles: () => {},
    newMessageImages: [],
    setNewMessageImages: () => {},
    showFilesDisplay: false,
    setShowFilesDisplay: () => {},

    useRetrieval: false,
    setUseRetrieval: () => {},
    sourceCount: 4,
    setSourceCount: () => {},
});

interface ChatbotUIProviderProps {
    children: ReactNode;
}

export const ChatbotUIProvider: FC<ChatbotUIProviderProps> = ({ children }) => {
    const [userInput, setUserInput] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatFileItems, setChatFileItems] = useState<ChatFile[]>([]);
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const [firstTokenReceived, setFirstTokenReceived] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [chatFiles, setChatFiles] = useState<ChatFile[]>([]);
    const [chatImages, setChatImages] = useState<MessageImage[]>([]);
    const [newMessageFiles, setNewMessageFiles] = useState<ChatFile[]>([]);
    const [newMessageImages, setNewMessageImages] = useState<MessageImage[]>([]);
    const [showFilesDisplay, setShowFilesDisplay] = useState<boolean>(false);
    const [useRetrieval, setUseRetrieval] = useState<boolean>(false);
    const [sourceCount, setSourceCount] = useState<number>(4);


    // useEffect(() => {
    //     // Simulate fetching from an API
    //     fetch('api/files')
    //         .then(response => response.json())
    //         .then(files => setChatFileItems(files.map(file => ({
    //             id: file.id,
    //             name: file.name || 'No name provided',
    //             type: file.type || 'Unknown type',
    //             content: file.content,
    //             created_at: file.created_at
    //         }))));
    // }, []);

    return (
        <ChatbotUIContext.Provider
            value={{
                userInput, setUserInput,
                chatMessages, setChatMessages,
                chatFileItems, setChatFileItems,
                abortController, setAbortController,
                firstTokenReceived, setFirstTokenReceived,
                isGenerating, setIsGenerating,
                chatFiles, setChatFiles,
                chatImages, setChatImages,
                newMessageFiles, setNewMessageFiles,
                newMessageImages, setNewMessageImages,
                showFilesDisplay, setShowFilesDisplay,
                useRetrieval, setUseRetrieval,
                sourceCount, setSourceCount,
            }}
        >
            {children}
        </ChatbotUIContext.Provider>
    );
};
