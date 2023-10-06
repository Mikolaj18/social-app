import "./chatMessage.scss";
import {useConversations} from "../../context/conversationsContext.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
const ChatMessage = ({message, isOwner}) => {
    const {selectedConversation} = useConversations();
    const {currentUser} = useContext(AuthContext);

    return (
      <div className={isOwner ? "chat__message chat__message--is-owner" : "chat__message"}>
          <div className="chat__message-text">
              {message.text}
          </div>
          <div className="chat__message-img user-profile-rounded">
              <img
                  src={isOwner ? currentUser.profilePicture : selectedConversation.profilePicture}
                  alt=""/>
          </div>
      </div>
    );
}

export default ChatMessage;