import "./chat.scss";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ChatConversation from "../../components/ChatConversation/ChatConversation.jsx";
import ChatMessageContainer from "../../components/ChatMessageContainer/ChatMessageContainer.jsx";
import {getConversations} from "../../db/conversations/getConversations.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import {useQuery} from "@tanstack/react-query";

const Chat = () => {
    const {isLoading, error, data} = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => await getConversations(),
    });

    return (
        <section className="chat">
            <div className="chat__wrapper">
                <div className="chat__aside">
                    <h2>Your Conversations</h2>
                    <div className="chat__search">
                        <SearchBar/>
                    </div>
                    <div className="chat__conversations">
                        {isLoading ? <Spinner/> : error ? "Something went wrong" :
                            data.map(conversation => (
                                <ChatConversation key={conversation._id} conversation={conversation}/>
                            ))
                        }
                    </div>
                </div>
                <ChatMessageContainer/>
            </div>
        </section>
    );
}

export default Chat;