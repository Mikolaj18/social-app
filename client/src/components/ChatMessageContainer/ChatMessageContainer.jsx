import "./chatMessageContainer.scss";
import ChatMessage from "../ChatMessage/ChatMessage.jsx";
import MessageForm from "../MessageForm/MessageForm.jsx";
import {useConversations} from "../../context/conversationsContext.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getMessages} from "../../db/messages/getMessages.js";
import {useContext, useEffect, useRef} from "react";
import Spinner from "../Spinner/Spinner.jsx";
import {AuthContext} from "../../context/authContext.jsx";
import {Link} from "react-router-dom";
import {useSocket} from "../../context/socketContext.jsx";

const ChatMessageContainer = () => {
    const messageContainerRef = useRef();
    const queryClient = useQueryClient();
    const {selectedConversation} = useConversations();
    const {currentUser} = useContext(AuthContext);
    const {socket} = useSocket();
    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ["messages", selectedConversation.userId],
        queryFn: async () => await getMessages(selectedConversation.userId),
        enabled: !!selectedConversation.userId,
    });


    useEffect(() => {
        if (messageContainerRef.current) messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }, [data]);

    useEffect(() => {
        if (selectedConversation.userId) refetch();
    }, [selectedConversation.userId, refetch]);

    useEffect(() => {
        const handleNewMessage = () => {
            // if (selectedConversation.userId === message.sender) {
            //     // queryClient.invalidateQueries("messages", selectedConversation.userId);
            //
            // }
            queryClient.invalidateQueries("conversations");
        };

        if (socket) {
            socket.on("newMessage", handleNewMessage);
            return () => {
                socket.off("newMessage", handleNewMessage);
            };
        }
    }, [socket, queryClient, selectedConversation.userId]);

    return (
        <div className="chat__message-container">
            {!selectedConversation.userId ? (
                <h1 className="center">Select a conversation to start messaging</h1>
            ) : (
                <>
                    <Link reloadDocument to={`/profile/${selectedConversation.userId}`}>
                        <div className="chat__message-user">
                            <div className="chat__message-user-img user-profile-rounded">
                                <img src={selectedConversation.profilePicture ? selectedConversation.profilePicture : "../src/images/default.jpg"} alt=""/>
                            </div>
                            <div className="chat__message-user-data">
                                {selectedConversation.name} {selectedConversation.surname}
                            </div>
                        </div>
                    </Link>
                    <div className="chat__messages" ref={messageContainerRef}>
                        {isLoading ? <Spinner/> : error ? "Something went wrong" :
                            data.map(message => (
                                <ChatMessage key={message._id} message={message} isOwner={currentUser._id === message.sender}/>
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