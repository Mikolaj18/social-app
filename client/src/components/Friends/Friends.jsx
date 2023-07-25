import "./friends.scss";
import Friend from "../Friend/Friend.jsx";

const Friends = ({data}) => {
    return (
        <div className="friends__wrapper">
            {data.map(friend => (
                <Friend item={friend} key={friend._id}/>
            ))}
        </div>
    );
}

export default Friends;