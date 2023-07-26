import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getFriendRequests} from "../../db/friends/getFriendRequests.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./friendRequests.scss";
import Friends from "../../components/Friends/Friends.jsx";
import {acceptFriendRequest} from "../../db/friends/acceptFriendRequest.js";

const FriendRequests = () => {
    const queryClient = useQueryClient();
    const {isLoading, error, data} = useQuery({
        queryKey: ["friendsRequests"],
        queryFn: () => getFriendRequests(),
    });
    console.log(data);

    const mutation = useMutation({
        mutationFn: async (id) => acceptFriendRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries("friendsRequests");
        }
    });

    const handleAcceptFriendRequest = async (id) => {
        const requestObject = {
            friendRequestId: id,
        }
        console.log(requestObject)
        mutation.mutate(requestObject);
    }

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
                    <Friends data={data} onAccept={handleAcceptFriendRequest}/>
                </>
            }
        </section>
    );
}

export default FriendRequests;