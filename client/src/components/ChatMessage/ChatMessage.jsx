import "./chatMessage.scss";
import {useConversation} from "../../context/conversationsContext.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";

const ChatMessage = ({message, isOwner}) => {
    const {selectedConversation} = useConversation();
    const {currentUser} = useContext(AuthContext);
    return (
        <div className={isOwner ? "chat__message chat__message--is-owner" : "chat__message"}>
            <div className="chat__message-text">
                {message.text}
            </div>
            {!isOwner &&
                <div className="chat__message-img user-profile-rounded">
                    <img
                        src={selectedConversation.profilePicture || "../src/images/default.jpg"} alt="pfp"
                    />
                </div>
            }
        </div>
    );
}

export default ChatMessage;