import moment from "moment/moment.js";
import {Link} from "react-router-dom";
import "./comment.scss"
import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getLikes} from "../../db/likes/getLikes.js";
import {unlike} from "../../db/likes/unlike.js";
import {like} from "../../db/likes/like.js";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";

const Comment = ({comment}) => {
    const {currentUser} = useContext(AuthContext)
    const queryClient = useQueryClient();
    const [isLiking, setIsLiking] = useState(false);

    const {isLoading, error, data} = useQuery({
        queryKey: [`like-${comment._id}`],
        queryFn: () => getLikes(comment._id),
    });

    const isLiked = data?.some(data => data.user._id === currentUser._id);

    const mutation = useMutation({
        mutationFn: async (objectId) => {isLiked ? await unlike(comment._id) : await like(objectId)},
        onSuccess: () => {
            queryClient.invalidateQueries('likes');
        }
    });

    const handleLike = async () => {
        if (!isLiking) {
            setIsLiking(true);
            await mutation.mutateAsync({objectId: comment._id});
            setIsLiking(false);
        }
    }

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
                <div className="comment__bottom">
                    <div className="comment__date">
                        <span>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                    <div className="comment__like" onClick={handleLike}>
                        <p style={{color: isLiked ? "#1877f2" : "#65676b"}}>Like</p>
                    </div>
                    {typeof data !== "undefined" && data.length !== 0 &&
                        <div className="comment__likes">
                            <p>{data.length}</p>
                            <ThumbUpIcon/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Comment;