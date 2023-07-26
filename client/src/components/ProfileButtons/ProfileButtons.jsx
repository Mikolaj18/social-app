import { Link } from 'react-router-dom';
import "./profileButtons.scss";

const ProfileButtons = ({isFriendRequestReceived, isFriendRequestSent, isUserHasRelationship, currentUser, id, handleFriendRequestSend, handleRemoveFriend,}) => {
    return (
        <div className="profile__buttons">
            {!isFriendRequestReceived && currentUser._id !== id && !isFriendRequestSent && !isUserHasRelationship && (
                <button onClick={handleFriendRequestSend} className="btn btn--blue">
                    Add to friend
                </button>
            )}

            {isUserHasRelationship && currentUser._id !== id && (
                <>
                    <button className="btn btn--blue btn--cursor-default">You are friends</button>
                    <button onClick={handleRemoveFriend} className="btn btn--red">
                        Remove from friends list
                    </button>
                </>
            )}

            {currentUser._id !== id && isFriendRequestSent ? (
                <button className="btn btn--blue btn--cursor-default">Friend request sent</button>
            ) : currentUser._id !== id && isFriendRequestReceived ? (
                <Link to="/friends/requests">
                    <button className="btn btn--blue">Invitation to friends in the mailbox</button>
                </Link>
            ) : null}

            {currentUser._id === id && <button className="btn btn--green">Edit profile</button>}
        </div>
    );
};

export default ProfileButtons;
