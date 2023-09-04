import "./friend.scss";
import { Link } from "react-router-dom";

const Friend = ({ item, isSender, isRequest, onAccept, onReject }) => {
    const friendData = isSender ? item.sender : item;

    return (
        <div className="friends__friend">
            <Link reloadDocument to={`/profile/${friendData._id}`}>
                <div className="friends__friend-img">
                    <img
                        src={friendData.profilePicture || "../src/images/default.jpg"}
                        alt="Cover picture"
                    />
                </div>
                <div>
                    <h2>
                        {friendData.name} {friendData.surname}
                    </h2>
                </div>
            </Link>
            {isRequest &&
                <div className="friends__friend-buttons">
                    <button onClick={() => onAccept(item._id)} className="btn btn--no-min-width btn--blue">
                        Accept
                    </button>
                    <button onClick={() => onReject(item._id)} className="btn btn--no-min-width btn--gray">
                        Reject
                    </button>
                </div>
            }
        </div>
    );
};

export default Friend;
