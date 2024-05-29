// src/app/api/chat/ServerChatPage.tsx
import AuthenticatedRoute from '../../(auth)/authenticated-route';
import ChatPage from '../../chat/ChatPage';

const ServerChatPage = async () => {
    return (
        <AuthenticatedRoute>
            <ChatPage />
        </AuthenticatedRoute>
    );
};

export default ServerChatPage;
