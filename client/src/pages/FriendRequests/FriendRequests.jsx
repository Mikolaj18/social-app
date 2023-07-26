import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getFriendRequests} from "../../db/friends/getFriendRequests.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./friendRequests.scss";
import Friends from "../../components/Friends/Friends.jsx";
import {acceptFriendRequest} from "../../db/friends/acceptFriendRequest.js";
import {rejectFriendRequest} from "../../db/friends/rejectFriendRequest.js";

const FriendRequests = () => {
    const queryClient = useQueryClient();
    const {isLoading, error, data} = useQuery({
        queryKey: ["friendsRequests"],
        queryFn: () => getFriendRequests(),
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

    if(data?.length === 0) {
        return (
            <h1 className="center" style={{textAlign: "center"}}>No friend requests!</h1>
        )
    }
    return (
        <section className="friendRequests">
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                <>
                    <h1>Friends request:</h1>
                    <Friends data={data} onAccept={handleAcceptFriendRequest} onReject={handleRejectFriendRequest}/>
                </>
            }
        </section>
    );
}

export default FriendRequests;