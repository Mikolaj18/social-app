import {useQuery} from "@tanstack/react-query";
import {getFriendRequests} from "../../db/friends/getFriendRequests.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./friendRequests.scss";
import Friends from "../../components/Friends/Friends.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";

const FriendRequests = () => {
    const {currentUser} = useContext(AuthContext);

    const {isLoading, error, data} = useQuery({
        queryKey: [currentUser._id],
        queryFn: () => getFriendRequests(),
    });

    console.log(data);
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