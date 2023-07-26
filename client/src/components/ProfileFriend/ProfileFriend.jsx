import {Link} from "react-router-dom";
import "./profileFriend.scss";

const ProfileFriend = ({item}) => {
    return (
        <div className="profile__friend">
            <Link reloadDocument to={`/profile/${item._id}`}>
                <div className="profile__friend-img">
                    <img src={item.profilePicture ? item.profilePicture : "../src/images/default.jpg"} alt="Profile picture"/>
                </div>
                <div className="profile__friend-data">
                    {item.name} {item.surname}
                </div>
            </Link>
        </div>
    );
}

export default ProfileFriend;