import {useQuery} from "@tanstack/react-query";
import {getFriendRequests} from "../../db/friendRequest/getFriendRequests.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./friendRequests.scss";
import Friends from "../../components/Friends/Friends.jsx";

const FriendRequests = () => {
    const {isLoading, error, data} = useQuery({
        queryKey: ["friendsRequest"],
        queryFn: () => getFriendRequests(),
    });
    if(data?.length === 0) {
        return (
            <h1 className="center" style={{textAlign: "center"}}>No friend requests!</h1>
        )
    }
    return (
        <section className="friendRequests">
            <h1>Friends request:</h1>
            <Friends data={data} isLoading={isLoading} error={error}/>
        </section>
    );
}

export default FriendRequests;