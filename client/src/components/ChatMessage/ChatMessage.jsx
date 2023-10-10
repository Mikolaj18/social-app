import "./chatMessage.scss";
import {useConversation} from "../../context/conversationsContext.jsx";
import {useState} from "react";
import moment from "moment";

const ChatMessage = ({message, isOwner}) => {
    const {selectedConversation} = useConversation();
    const [isHovered, setIsHovered] = useState(false);
    const parsedDate = moment(message.createdAt);
    const formattedData = parsedDate.format('DD.MM.YYYY, HH:mm');
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
            {isHovered && <div className="chat__message-date">{formattedData}</div> }
        </div>
    );
}

export default ChatMessage;