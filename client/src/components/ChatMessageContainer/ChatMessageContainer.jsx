import "./chatMessageContainer.scss";
import ChatMessage from "../ChatMessage/ChatMessage.jsx";
import MessageForm from "../MessageForm/MessageForm.jsx";
import {useConversations} from "../../context/conversationsContext.jsx";
import {useQuery} from "@tanstack/react-query";
import {getMessages} from "../../db/messages/getMessages.js";
import {useContext, useEffect, useRef, useState} from "react";
import Spinner from "../Spinner/Spinner.jsx";
import {AuthContext} from "../../context/authContext.jsx";
import {Link} from "react-router-dom";

const ChatMessageContainer = () => {
    const messagecContainerRef = useRef();
    const {selectedConversation} = useConversations();
    const {currentUser} = useContext(AuthContext);
    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ["messages", selectedConversation.userId],
        queryFn: async () => await getMessages(selectedConversation.userId),
        enabled: !!selectedConversation.userId,
    });

    useEffect(() => {
        if (messagecContainerRef.current) messagecContainerRef.current.scrollTop = messagecContainerRef.current.scrollHeight;
        }, [data]);

    useEffect(() => {
        if (selectedConversation.userId) refetch();
    }, [selectedConversation.userId, refetch]);

    return (
        <div className="chat__message-container">
            {!selectedConversation.userId ? (
                <h1 className="center">Select a conversation to start messaging</h1>
            ) : (
                <>
                    <Link reloadDocument to={`/profile/${selectedConversation.userId}`}>
                        <div className="chat__message-user">
                            <div className="chat__message-user-img user-profile-rounded">
                                <img
                                    src={selectedConversation.profilePicture}
                                    alt=""/>
                            </div>
                            <div className="chat__message-user-data">
                                {selectedConversation.name} {selectedConversation.surname}
                            </div>
                        </div>
                    </Link>
                    <div className="chat__messages" ref={messagecContainerRef}>
                        {isLoading ? <Spinner/> : error ? "Something went wrong" :
                            data.map(message => (
                                <ChatMessage key={message._id} message={message}
                                             isOwner={currentUser._id === message.sender}/>
                            ))
                        }
                    </div>
                    <MessageForm/>
                </>
            )}
        </div>
    );
}

export default ChatMessageContainer;