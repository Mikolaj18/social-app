import moment from "moment/moment.js";
import {Link} from "react-router-dom";
import "./comment.scss"

const Comment = ({comment}) => {
    return (
        <div className="comment">
            <div className="comment__wrapper">
                <div className="comment__flex">
                    <Link reloadDocument to={`/profile/${comment.author._id}`}>
                        <div className="comment__img user-profile-rounded">
                            <img
                                src={comment.author.profilePicture ? comment.author.profilePicture : "../src/images/default.jpg"}
                                alt="Profile picture"/>
                        </div>
                    </Link>
                    <div className="comment__content">
                        <Link reloadDocument to={`/profile/${comment.author._id}`}>
                            <div className="comment__author">
                                {comment.author.name} {comment.author.surname}
                            </div>
                        </Link>
                        <div className="comment__desc">
                            {comment.description}
                        </div>
                    </div>
                </div>
                <div className="comment__date">
                    <span>{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    );
}

export default Comment;