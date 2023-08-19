import moment from "moment/moment.js";
import "./comment.scss"

const Comment = ({comment}) => {
    return (
        <div className="comment">
            <div className="comment__wrapper">
                <div className="comment__flex">
                    <div className="comment__img">
                        <img
                            src={comment.author.profilePicture ? comment.author.profilePicture : "../src/images/default.jpg"}
                            alt="Profile picture"/>
                    </div>
                    <div className="comment__content">
                        <div className="comment__author">
                            {comment.author.name} {comment.author.surname}
                        </div>
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