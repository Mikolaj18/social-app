import "./chatMessageContainer.scss";
import ChatMessage from "../ChatMessage/ChatMessage.jsx";
import MessageForm from "../MessageForm/MessageForm.jsx";
import {useConversation} from "../../context/conversationsContext.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getMessages} from "../../db/messages/getMessages.js";
import {useContext, useEffect, useRef} from "react";
import Spinner from "../Spinner/Spinner.jsx";
import {AuthContext} from "../../context/authContext.jsx";
import {Link} from "react-router-dom";
import {useSocket} from "../../context/socketContext.jsx";
import moment from "moment/moment.js";

const ChatMessageContainer = () => {
    const messageContainerRef = useRef();
    const queryClient = useQueryClient();
    const {selectedConversation} = useConversation();
    const {currentUser} = useContext(AuthContext);
    const {socket} = useSocket();
    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ["messages", selectedConversation.userId],
        queryFn: async () => await getMessages(selectedConversation.userId),
        enabled: !!selectedConversation.userId,
    });

    const lastMessage = data ? data[data.length - 1] : false;
    useEffect(() => {
        if (messageContainerRef.current) messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }, [data]);

    // useEffect(() => {
    //     if (selectedConversation.userId) refetch();
    //     console.log('elo')
    // }, [selectedConversation.userId, refetch]);

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

    useEffect(() => {
        const recipientLastMessage = data && data.length && data[data.length - 1].sender !== currentUser._id;

        if (recipientLastMessage) {
            socket.emit("markMessagesAsSeen", {
                conversationId: selectedConversation._id,
                userId: selectedConversation.userId,
            });
        }

        if(socket) {
            socket.on("messagesSeen", ({ conversationId }) => {
                if (selectedConversation._id === conversationId) {
                    // Oznacz wiadomości jako przeczytane w stanie React Query
                    queryClient.setQueryData(["messages", selectedConversation.userId], (prevData) => {
                        if (prevData) {
                            return prevData.map((message) => {
                                if (!message.seen) {
                                    return {
                                        ...message,
                                        seen: true,
                                    };
                                }
                                return message;
                            });
                        }
                    });
                }
            });
        }
    }, [socket, currentUser._id, data, selectedConversation]);

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
                        <div className="chat__message-seen">
                            {!lastMessage ? "" : (lastMessage.seen
                                ?
                                <div className="user-profile-rounded user-profile-rounded--small"><img src={selectedConversation.profilePicture} alt="pfp"/></div>
                                :
                                <span className="chat__message-sent-date">{`Sent ${moment(lastMessage.createdAt).fromNow()}`}</span>)}
                        </div>
                    </div>
                    <MessageForm/>
                </>
            )}
        </div>
    );
}

export default ChatMessageContainer;