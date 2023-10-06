import React, { createContext, useContext, useState } from 'react';

const ConversationsContext = createContext();

const ConversationsContextProvider = ({ children }) => {
    const [selectedConversation, setSelectedConversation] = useState({
        _id: '',
        userId: '',
        name: '',
        surname: '',
        profilePicture: '',
    });

    return (
        <ConversationsContext.Provider
            value={{
                selectedConversation,
                setSelectedConversation,
            }}
        >
            {children}
        </ConversationsContext.Provider>
    );
}

const useConversations = () => {
    const context = useContext(ConversationsContext);
    if (!context) {
        throw new Error('useConversations must be used within a ConversationsContextProvider');
    }
    return context;
}

export { ConversationsContextProvider, useConversations };
