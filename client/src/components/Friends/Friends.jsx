import "./friends.scss";
import Friend from "../Friend/Friend.jsx";

const Friends = ({data, onAccept, onReject}) => {
    return (
        <div className="friends__wrapper">
            {data.map(friend => (
                    <Friend item={friend} key={friend._id} onAccept={() => onAccept(friend._id)} onReject={(() => onReject(friend._id))}/>
            ))}
        </div>
    );
}

export default Friends;