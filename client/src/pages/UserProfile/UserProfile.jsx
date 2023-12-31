import "./userProfile.scss";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getSingleUserData} from "../../db/user/getSingleUserData.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {getSentFriendRequests} from "../../db/friends/getSentFriendRequests.js";
import {getFriendRequests} from "../../db/friends/getFriendRequests.js";
import {sendFriendRequest} from "../../db/friends/sendFriendRequest.js";
import {getFriendsList} from "../../db/friends/getFriendsList.js";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo.jsx";
import {removeFriend} from "../../db/friends/removeFriend.js";
import ProfileFriend from "../../components/ProfileFriend/ProfileFriend.jsx";
import ProfileButtons from "../../components/ProfileButtons/ProfileButtons.jsx";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit.jsx";
import Posts from "../../components/Posts/Posts.jsx";

const UserProfile = () => {
    const {id} = useParams();
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const {isLoading, error, data} = useQuery({
        queryKey: ["profile", id],
        queryFn: async () => await getSingleUserData(id),
    });

    const {isLoading: sentIsLoading, error: sentError, data: sentData} = useQuery({
        queryKey: ["sentRequests"],
        queryFn: async () => await getSentFriendRequests(),
    });

    const {isLoading: requestLoading, error: requestError, data: requestData} = useQuery({
        queryKey: ["friendsRequest"],
        queryFn: async () => await getFriendRequests(),
    });

    const {isLoading: friendsIsLoading, error: friendsError, data: friendsData} = useQuery({
        queryKey: ["friends", currentUser._id],
        queryFn: async () => await getFriendsList(id),
    });

    const mutation = useMutation({
        mutationFn: async (data) => await sendFriendRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries("sentRequests");
        }
    });

    const removeFriendMutation = useMutation({
        mutationFn: async (id) => removeFriend(id),
        onSuccess: () => {
            queryClient.invalidateQueries("friends");
        }
    });

    const handleFriendRequestSend = async () => {
        const userObject = {
            receiverId: id,
        }
        mutation.mutate(userObject);
    }

    const handleRemoveFriend = async () => {
        removeFriendMutation.mutate(id);
    }

    const isFriendRequestSent = sentData?.some(data => data.receiver === id && data.status === 'pending');
    const isFriendRequestReceived = requestData?.some(data => data.sender._id === id && data.status === 'pending');
    const isUserHasRelationship = friendsData?.some(data => data._id === currentUser._id);

    return (
        <section className="profile">
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                <div className="profile__wrapper">
                    <div className="profile__cover">
                        {data.coverPicture
                            ? <img src={data.coverPicture} alt="Cover picture"/>
                            : <div className="profile__cover-empty"></div>
                        }
                    </div>
                    <div className="profile__content">
                        <div className="profile__flex">
                            <div className="profile__data">
                                <div className="profile__data-img">
                                    <img src={data.profilePicture ? data.profilePicture : "../src/images/default.jpg"}
                                         alt="Profile picture"/>
                                </div>
                                <div className="profile__data-info">
                                    <h1>{data.name} {data.surname}</h1>
                                    {typeof friendsData !== "undefined" &&
                                        <p>{friendsData?.length === 1 ? "1 friend" : `${friendsData?.length} friends`}</p>
                                    }
                                </div>
                            </div>
                            <ProfileButtons
                                isFriendRequestReceived={isFriendRequestReceived}
                                isFriendRequestSent={isFriendRequestSent}
                                isUserHasRelationship={isUserHasRelationship}
                                currentUser={currentUser}
                                id={id}
                                handleFriendRequestSend={handleFriendRequestSend}
                                handleRemoveFriend={handleRemoveFriend}
                                onClick={() => setIsOpen(true)}
                            />
                        </div>
                        <div className="profile__flex profile__flex--1000">
                            <div className="profile__personal">
                                <div className="profile__personal-info">
                                    <h2>Informations</h2>
                                    {data.description &&
                                        <div className="profile__personal-info-description">
                                            {data.description}
                                        </div>
                                    }
                                    <ProfileInfo data={data}/>
                                </div>
                                <div className="profile__friends">
                                    <div className="profile__friends-title">
                                        <h2>Friends</h2>
                                        <Link to={`/friends/${id}`}>
                                            Show all friends
                                        </Link>
                                    </div>
                                    <div className="profile__friends-flex">
                                        {friendsIsLoading ? <Spinner/> : friendsError ? "Something went wrong" :
                                            friendsData.map(f => (
                                                <ProfileFriend item={f} key={f._id}/>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className="profile__posts">
                                <h2 className="profile__posts-header">Posts</h2>
                                <Posts id={id} includeFriends={false} />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isOpen &&
                <ProfileEdit
                    data={data}
                    setIsOpen={setIsOpen}
                />
            }
        </section>
    );
}

export default UserProfile;