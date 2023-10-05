import "./chat.scss";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ChatConversation from "../../components/ChatConversation/ChatConversation.jsx";
const Chat = () => {
    return (
        <section className="chat">
            <div className="chat__wrapper">
                <div className="chat__aside">
                    <h2>Your Conversations</h2>
                    <div className="chat__search">
                        <SearchBar/>
                    </div>
                    <div className="chat__conversations">
                        <ChatConversation/>
                        <ChatConversation/>
                        <ChatConversation/>
                    </div>
                </div>
                <div className="chat__container">
                    Message Container
                </div>
            </div>
        </section>
    );
}

export default Chat;