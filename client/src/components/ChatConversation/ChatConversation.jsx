import "./chatConversation.scss";
const ChatConversation = () => {
    return (
        <div className="chat__conversation">
            <div className="chat__conversation-img user-profile-rounded">
                <img
                    src="https://res.cloudinary.com/dih42rvjf/raw/upload/v1693226396/social/mdictliqqll8icnwijsi.jpg"
                    alt=""/>
            </div>
            <div className="chat__conversation-flex">
                <div className="chat__conversation-data">
                    John Doe
                </div>
                <div className="chat__conversation-last-msg">
                    Lorem ipsum dolor
                </div>
            </div>
        </div>
    );
}

export default ChatConversation;