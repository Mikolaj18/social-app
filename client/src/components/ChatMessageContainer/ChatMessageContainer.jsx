import "./chatMessageContainer.scss";
import ChatMessage from "../ChatMessage/ChatMessage.jsx";
import MessageForm from "../MessageForm/MessageForm.jsx";

const ChatMessageContainer = () => {
    return (
      <div className="chat__message-container">
          <div className="chat__message-user">
              <div className="chat__message-user-img user-profile-rounded">
                  <img
                      src="https://res.cloudinary.com/dih42rvjf/raw/upload/v1693226396/social/mdictliqqll8icnwijsi.jpg"
                      alt=""/>
              </div>
              <div className="chat__message-user-data">
                  John Doe
              </div>
          </div>
          <div className="chat__messages">
              <ChatMessage isOwner={true}/>
              <ChatMessage isOwner={false}/>
              <ChatMessage isOwner={true}/>
              <ChatMessage isOwner={false}/>
              <ChatMessage isOwner={true}/>
              <ChatMessage isOwner={false}/>
              <ChatMessage isOwner={true}/>
              <ChatMessage isOwner={false}/>
              <ChatMessage isOwner={false}/>
              <ChatMessage isOwner={false}/>
              <ChatMessage isOwner={true}/>
              <ChatMessage isOwner={false}/>
          </div>
          <MessageForm/>
      </div>
    );
}

export default ChatMessageContainer;