import { FC, useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChatbotUIContext } from '@/app/chat/context';
import { useChatHandler } from '@/app/chat/hooks/use-chat-handler';
import useHotkey from '@/lib/hooks/use-hotkey';
import { useScroll } from '@/app/chat/hooks/use-scroll';
import { ChatInput } from '@/app/chat/chat-input';
import { ChatMessages } from '@/app/chat/chat-messages';
import { ChatScrollButtons } from '@/components/chat/chat-scroll-buttons';
import Loading from '@/app/chat/loading';

interface ChatUIProps {}

export const ChatUI: FC<ChatUIProps> = () => {
    const { handleNewChat, handleFocusChatInput } = useChatHandler();
    useHotkey("o", handleNewChat);

    const params = useParams();
    const { isGenerating } = useContext(ChatbotUIContext); // Updated context hook usage

    const {
        messagesStartRef, 
        messagesEndRef, 
        handleScroll, 
        scrollToBottom, 
        isAtTop, 
        isAtBottom, 
        isOverflowing, 
        scrollToTop
    } = useScroll();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Adjusting loading logic based on the presence of a chat ID and isGenerating status
        setLoading(!params.chatid || isGenerating);
        if (params.chatid) {
            handleFocusChatInput();
        }
    }, [params.chatid, handleFocusChatInput, isGenerating]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="relative flex h-full flex-col items-center">
            <div className="absolute left-4 top-2.5 flex justify-center">
                <ChatScrollButtons
                    isAtTop={isAtTop}
                    isAtBottom={isAtBottom}
                    isOverflowing={isOverflowing}
                    scrollToTop={scrollToTop}
                    scrollToBottom={scrollToBottom}
                />
            </div>
            <div className="absolute right-4 top-1 flex h-[40px] items-center space-x-2">
            </div>
            <div className="bg-secondary flex max-h-[50px] min-h-[50px] w-full items-center justify-center border-b-2 font-bold">
                {/* Removing selectedChat and replacing it with a generic title */}
                <div className="max-w-[200px] truncate sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]">
                    Current Chat Session
                </div>
            </div>
            <div className="flex size-full flex-col overflow-auto border-b" onScroll={handleScroll}>
                <div ref={messagesStartRef} />
                <ChatMessages />
                <div ref={messagesEndRef} />
            </div>
            <div className="relative w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
                <ChatInput />
            </div>
            <div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">
            </div>
        </div>
    );
};
