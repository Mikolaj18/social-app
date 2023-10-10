import "./rightMenu.scss";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getFriendsList} from "../../db/friends/getFriendsList.js";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import {Link} from "react-router-dom";
import {createConversation} from "../../db/conversations/createConversation.js";
import {useConversation} from "../../context/conversationsContext.jsx";
import {getConversations} from "../../db/conversations/getConversations.js";

const RightMenu = () => {
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
    const {setSelectedConversation} = useConversation();

    const {isLoading: isLoadingConv, error: errorConv, data: dataConv} = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => await getConversations(),
    });

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

    const handleConversation = async (recipient) => {
        const id = dataConv.filter(p => p.participants[0]._id === recipient._id);
        const isConversationExists = id[0]?.participants[0]._id === recipient._id;
        conversationMutation.mutate({recipientId: recipient._id});

        if (isConversationExists) {
            const conversationId = id[0]._id;
            setSelectedConversation({
                _id: conversationId,
                userId: recipient._id,
                name: recipient.name,
                surname: recipient.surname,
                profilePicture: recipient.profilePicture,
            });
        } else {
            setSelectedConversation({
                _id: "",
                userId: "",
                name: "",
                surname: "",
                profilePicture: "",
            });
        }
    }

    return (
        <aside className="rightMenu">
            <div className="rightMenu__wrapper">
                <h2 className="rightMenu__title">Contacts</h2>
                <ul className="rightMenu__list">
                    {isLoading ? <Spinner/> : error ? "Something went wrong" :
                        data.map(f => (
                            <Link to="/chat" onClick={() => handleConversation(f, conversationMutation.data)}
                                  key={f._id}>
                                <li className="rightMenu__list-item">
                                    <img src={f.profilePicture ? f.profilePicture : "../src/images/default.jpg"}
                                         alt="Profile picture"/>
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