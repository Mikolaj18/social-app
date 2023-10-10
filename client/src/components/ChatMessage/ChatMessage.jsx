import "./chatMessage.scss";
import {useConversation} from "../../context/conversationsContext.jsx";
import {useState} from "react";

const ChatMessage = ({message, isOwner}) => {
    const {selectedConversation} = useConversation();
    const [isHovered, setIsHovered] = useState(false);
    const date = new Date(message.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return (
        <div className={isOwner ? "chat__message chat__message--is-owner" : "chat__message"} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
            {isHovered && <div className="chat__message-date">{formattedTime}</div> }
        </div>
    );
}

export default ChatMessage;