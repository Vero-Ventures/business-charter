"use client";

import { ChatInput } from "@/app/chat/chat-input";
import { ChatUI } from "@/app/chat/chat-ui";
import { Brand } from "@/components/ui/brand";
import { ChatbotUIProvider, ChatbotUIContext } from "@/app/chat/context"; 
import useHotkey from "@/lib/hooks/use-hotkey";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { useChatHandler } from "@/app/chat/hooks/use-chat-handler";

export default function ChatPage() {
    const { chatMessages } = useContext(ChatbotUIContext);
    const { handleNewChat, handleFocusChatInput } = useChatHandler();
    const { theme } = useTheme();

    useHotkey("o", handleNewChat);
    useHotkey("l", handleFocusChatInput);

    return (
        <ChatbotUIProvider> 
            {chatMessages.length === 0 ? (
                <div className="relative flex h-full flex-col items-center justify-center">
                    <div className="top-50% left-50% -translate-x-50% -translate-y-50% absolute mb-20">
                        <Brand theme={theme === "dark" ? "dark" : "light"} />
                    </div>
                    <div className="absolute right-2 top-2">
                    </div>
                    <div className="flex grow flex-col items-center justify-center" />
                    <div className="w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
                        <ChatInput />
                    </div>
                    <div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">
                    </div>
                </div>
            ) : (
                <ChatUI />
            )}
        </ChatbotUIProvider>
    );
}
