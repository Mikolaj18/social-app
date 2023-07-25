import "./friends.scss";
import Friend from "../Friend/Friend.jsx";
import Spinner from "../Spinner/Spinner.jsx";

const Friends = ({data, isLoading, error}) => {
    return (
        <div className="friends__wrapper">
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                data.map(friend => (
                    <Friend item={friend} key={friend._id}/>
                ))
            }
        </div>

    );
}

export default Friends;