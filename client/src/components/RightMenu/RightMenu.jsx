import "./rightMenu.scss";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getFriendsList} from "../../db/friends/getFriendsList.js";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import {Link} from "react-router-dom";
import {createConversation} from "../../db/conversations/createConversation.js";
import {useConversations} from "../../context/conversationsContext.jsx";

const RightMenu = () => {
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
    const {setSelectedConversation} = useConversations();

    const {isLoading, error, data} = useQuery({
        queryKey: [currentUser._id],
        queryFn: () => getFriendsList(currentUser._id),
    });

    const conversationMutation = useMutation({
        mutationFn: async (id) => createConversation(id),
        onSuccess: () => {
            queryClient.invalidateQueries("conversations");
        }
    });

    const handleConversation = async (recipient, conversationId) => {
        conversationMutation.mutate({recipientId: recipient._id});
        setSelectedConversation({
            _id: "",
            userId: "",
            name: "",
            surname: "",
            profilePicture: "",
        });

    }

    return (
        <aside className="rightMenu">
            <div className="rightMenu__wrapper">
                <h2 className="rightMenu__title">Contacts</h2>
                <ul className="rightMenu__list">
                    {isLoading ? <Spinner/> : error ? "Something went wrong" :
                        data.map(f => (
                            <Link to="/chat" onClick={() => handleConversation(f, conversationMutation.data)} key={f._id}>
                                <li className="rightMenu__list-item">
                                    <img src={f.profilePicture ? f.profilePicture : "../src/images/default.jpg"} alt="Profile picture"/>
                                    <p>{f.name} {f.surname}</p>
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </aside>
    );
}

export default RightMenu;