import "./friend.scss";
import {Link} from "react-router-dom";

const Friend = ({item}) => {
    return (
        <div className="friends__friend">
            <Link to={`/profile/${item.sender._id}`}>
                <div className="friends__friend-img">
                    <img src={item.sender.profilePicture} alt="Cover picture"/>
                </div>
                <div>
                    <h2>{item.sender.name} {item.sender.surname}</h2>
                </div>
            </Link>
            <div className="friends__friend-buttons">
                <button className="btn btn--no-min-width btn--blue">
                    Accept
                </button>
                <button className="btn btn--no-min-width btn--gray">
                    Deny
                </button>
            </div>
        </div>
    );
}

export default Friend;