import {useQuery} from "@tanstack/react-query";
import {getFriendsList} from "../../db/friends/getFriendsList.js";
import {useParams} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";
import Friend from "../../components/Friend/Friend.jsx";
import "./friends.scss";
import {getSingleUserData} from "../../db/user/getSingleUserData.js";

const Friends = () => {
    const {id} = useParams();

    const {isLoading, error, data} = useQuery({
        queryKey: [id],
        queryFn: () => getFriendsList(id),
    });
    const {isLoading: userIsLoading, error: userError, data: userData} = useQuery({
        queryKey: ["profile"],
        queryFn: () => getSingleUserData(id),
    });


    return (
        <section>
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                <>
                    <h1 className="header">Friends of {userData?.name} {userData?.surname}:</h1>
                    <div className="friends">
                        {data.map(f => (
                            <Friend key={f._id} item={f} isSender={false} isRequest={false}/>
                        ))}
                    </div>
                </>
            }
        </section>
    );
}

export default Friends;