import "./friend.scss";
import {Link} from "react-router-dom";

const Friend = ({item, onAccept, onReject}) => {
    return (
        <div className="friends__friend">
            <Link to={`/profile/${item.sender._id}`}>
                <div className="friends__friend-img">
                    <img src={item.sender.profilePicture ? item.sender.profilePicture : "../src/images/default.jpg"} alt="Cover picture"/>
                </div>
                <div>
                    <h2>{item.sender.name} {item.sender.surname}</h2>
                </div>
            </Link>
            <div className="friends__friend-buttons">
                <button onClick={() => onAccept(item._id)} className="btn btn--no-min-width btn--blue">
                    Accept
                </button>
                <button onClick={() => onReject(item._id)} className="btn btn--no-min-width btn--gray">
                    Reject
                </button>
            </div>
        </div>
    );
}

export default Friend;