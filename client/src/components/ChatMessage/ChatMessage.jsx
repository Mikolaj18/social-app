import "./chatMessage.scss";
const ChatMessage = ({isOwner}) => {
    return (
      <div className={isOwner ? "chat__message chat__message--is-owner" : "chat__message"}>
          <div className="chat__message-text">
               Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          </div>
          <div className="chat__message-img user-profile-rounded">
              <img
                  src="https://res.cloudinary.com/dih42rvjf/raw/upload/v1693226396/social/mdictliqqll8icnwijsi.jpg"
                  alt=""/>
          </div>
      </div>
    );
}

export default ChatMessage;