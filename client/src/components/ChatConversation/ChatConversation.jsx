import "./chatConversation.scss";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {useConversations} from "../../context/conversationsContext.jsx";
const ChatConversation = ({conversation}) => {
    const user = conversation.participants[0];
    const lastMessage = conversation.lastMessage;
    const {currentUser} = useContext(AuthContext);
    const { selectedConversation, setSelectedConversation } = useConversations();
    console.log(selectedConversation);
    return (
        <div
            className={
            selectedConversation?._id === conversation._id
                ? "chat__conversation chat__conversation--selected"
                : "chat__conversation"}
             onClick={() => setSelectedConversation({
            _id: conversation._id,
            userId: user._id,
            name: user.name,
            surname: user.surname,
            profilePicture: user.profilePicture,
        })}>
            <div className="chat__conversation-img user-profile-rounded">
                <img
                    src={user.profilePicture}
                    alt="pfp"/>
            </div>
            <div className="chat__conversation-flex">
                <div className="chat__conversation-data">
                    {user.name} {user.surname}
                </div>
                <div className="chat__conversation-last-msg">
                    {currentUser._id === lastMessage.sender ? <DoneAllIcon/> : ""}
                    {lastMessage.text.length > 18 ? `${lastMessage.text.substring(0, 18)}...` : lastMessage.text}
                </div>
            </div>
        </div>
    );
}

export default ChatConversation;