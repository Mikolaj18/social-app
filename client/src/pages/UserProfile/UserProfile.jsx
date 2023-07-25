import "./userProfile.scss";
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getSingleUserData} from "../../db/user/getSingleUserData.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import HouseIcon from '@mui/icons-material/House';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {getSentFriendRequests} from "../../db/friendRequest/getSentFriendRequests.js";
import {getFriendRequests} from "../../db/friendRequest/getFriendRequests.js";
import {sendFriendRequest} from "../../db/friendRequest/sendFriendRequest.js";

const UserProfile = () => {
    const {id} = useParams();
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
    const {isLoading, error, data} = useQuery({
        queryKey: ["profiles"],
        queryFn: () => getSingleUserData(id),
    });

    const {isLoading: sentIsLoading, error: sentError, data: sentData} = useQuery({
        queryKey: ["sentRequests"],
        queryFn: () => getSentFriendRequests(),
    });

    const {isLoading: requestLoading, error: requestError, data: requestData} = useQuery({
        queryKey: ["friendsRequest"],
        queryFn: () => getFriendRequests(),
    });

    const mutation = useMutation({
        mutationFn: async (id) => sendFriendRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries("sentRequests");
        }
    });

    const handleFriendRequestSend = async () => {
        const userObject = {
            receiverId: id,
        }
        mutation.mutate(userObject);
    }

    const isFriendRequestSent = sentData?.some(data => data.receiver === id);
    const isFriendRequestReceived = requestData?.some(data => data.sender._id === id);

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
                                    <img src={data.profilePicture} alt="Profile picture"/>
                                </div>
                                <div className="profile__data-info">
                                    <h1>{data.name} {data.surname}</h1>
                                    <p>370 friends</p>
                                </div>
                            </div>

                            <div className="profile__button">
                                {!isFriendRequestReceived && currentUser._id !== id && !isFriendRequestSent &&
                                    <button onClick={handleFriendRequestSend} className="btn btn--blue">Add to friend</button>
                                }
                                {currentUser._id !== id && isFriendRequestSent ? (
                                    <button className="btn btn--blue">Friend request sent</button>
                                ) : currentUser._id !== id && isFriendRequestReceived ? (
                                    <Link to="/friends/requests">
                                        <button className="btn btn--blue">Invitation to friends in the mailbox</button>
                                    </Link>
                                ) : null}
                                {currentUser._id === id &&
                                    <button className="btn btn--green">Edit profile</button>
                                }
                            </div>
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
                                    <ul>
                                        {data.livesIn &&
                                            <li>
                                                <HouseIcon/>
                                                Lives in: <b>{data.livesIn}</b>
                                            </li>
                                        }
                                        {data.from &&
                                            <li>
                                                <LocationOnIcon/>
                                                From: <b>{data.from}</b>
                                            </li>
                                        }
                                        {data.school &&
                                            <li>
                                                <SchoolIcon/>
                                                Studied in: <b>{data.school}</b>
                                            </li>
                                        }
                                        {data.work &&
                                            <li>
                                                <WorkIcon/>
                                                Works in: <b>{data.work}</b>
                                            </li>
                                        }
                                    </ul>
                                </div>
                                <div className="profile__friends">
                                    <div className="profile__friends-title">
                                        <h2>Friends</h2>
                                        <Link to="/">
                                            Show all friends
                                        </Link>
                                    </div>
                                    <div className="profile__friends-flex">
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                        <div className="profile__friend">
                                            <div className="profile__friend-img">
                                                <img src="https://fakeimg.pl/250x100/" alt="Profile picture"/>
                                            </div>
                                            <div className="profile__friend-data">
                                                Lorem ipsum
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile__posts">
                                <h2>Posty</h2>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default UserProfile;