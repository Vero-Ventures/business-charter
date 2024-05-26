import React, { useState } from 'react';
import { MessageProps } from '@/app/chat/types/types'; // Adjust imports

export const Message: React.FC<MessageProps> = ({
    message,
    fileItems,
    isEditing,
    isLast,
    onStartEdit,  
    onCancelEdit,
    onSubmitEdit,
}) => {
    const [editContent, setEditContent] = useState(message.content);

    const handleEditSubmit = () => {
        onSubmitEdit?.(editContent); 
        onCancelEdit?.(); 
    };

    return (
        <div className={`message ${isLast ? 'last-message' : ''}`}>
            {isEditing ? (
                <div>
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button onClick={handleEditSubmit}>Submit</button>
                    <button onClick={onCancelEdit}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{message.content}</p> 
                    <button onClick={onStartEdit}>Edit</button>
                </div>
            )}
            {/* Render file items if needed */}
            {fileItems.map((fileItem) => (
                <div key={fileItem.id}>{fileItem.name}</div>
            ))}
        </div>
    );
};
