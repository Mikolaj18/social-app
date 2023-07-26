import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getFriendRequests} from "../../db/friends/getFriendRequests.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./friendRequests.scss";
import {acceptFriendRequest} from "../../db/friends/acceptFriendRequest.js";
import {rejectFriendRequest} from "../../db/friends/rejectFriendRequest.js";
import {getRandomUsers} from "../../db/user/getRandomUsers.js";
import Friend from "../../components/Friend/Friend.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const FriendRequests = () => {
    const queryClient = useQueryClient();
    const {isLoading, error, data} = useQuery({
        queryKey: ["friendsRequests"],
        queryFn: () => getFriendRequests(),
    });

    const {isLoading: isLoadingRandom, error: errorRandom, data: dataRandom} = useQuery({
        queryKey: ["randomUsers"],
        queryFn: () => getRandomUsers(),
    });


    const acceptMutation = useMutation({
        mutationFn: async (id) => acceptFriendRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries("friendsRequests");
        }
    });

    const rejectMutation = useMutation({
        mutationFn: async (id) => rejectFriendRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries("friendsRequests");
        }
    });

    const handleFriendRequest = (mutateFn) => async (id) => {
        const requestObject = {
            friendRequestId: id,
        };
        mutateFn.mutate(requestObject);
    };

    const handleAcceptFriendRequest = handleFriendRequest(acceptMutation);
    const handleRejectFriendRequest = handleFriendRequest(rejectMutation);

    const settings = {
        showArrows: true,
        infiniteLoop: true,
        showIndicators: false,
        centerMode: true,
        centerSlidePercentage: 100,
        emulateTouch: true,
        showStatus: false,
        showThumbs: false,
    };


    return (
        <section className="friendRequests">
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                data.length === 0 ?
                    <h1>No friend requests!</h1>
                    :
                    <>
                        <h1>Friends request:</h1>
                        {data.map(f => (
                            <Friend key={f._id} item={f} isRequest={true} isSender={true} onAccept={handleAcceptFriendRequest} onReject={handleRejectFriendRequest}/>
                        ))}
                    </>
            }
            {isLoadingRandom ? <Spinner/> : error ? "Something went wrong" :
                <>
                    <p>People you may know</p>
                    <div className="slider-wrapper">
                        <Carousel {...settings}>
                            {dataRandom.map(f => (
                                <Friend item={f} isRequest={false} isSender={false} key={f._id} />
                            ))}
                        </Carousel>
                    </div>
                </>
            }
        </section>
    );
}

export default FriendRequests;