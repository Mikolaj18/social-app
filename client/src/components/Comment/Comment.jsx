import moment from "moment/moment.js";
import {Link} from "react-router-dom";
import "./comment.scss"
import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getLikes} from "../../db/likes/getLikes.js";
import {unlike} from "../../db/likes/unlike.js";
import {like} from "../../db/likes/like.js";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import LikesList from "../LikesList/LikesList.jsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz.js";
import OptionsBox from "../PostOptions/OptionsBox.jsx";
import CommentEdit from "../CommentEdit/PostEdit.jsx";

const Comment = ({comment}) => {
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [isLiking, setIsLiking] = useState(false);
    const [isLikesListOpen, setIsLikesListOpen] = useState(false);
    const [istOptionsBoxOpen, setIsOptionsBoxOpen] = useState(false);
    const [isCommentEditOpen, setIsCommentEditOpen] = useState(false);

    useEffect(() => {
        isLikesListOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLikesListOpen]);

    useEffect(() => {
        isCommentEditOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isCommentEditOpen]);

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

    const handleLikesListOpen = () => {
        setIsLikesListOpen(!isLikesListOpen);
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
                    <div className="comment__options">
                        {comment.author._id === currentUser._id &&
                            <MoreHorizIcon className="comment__options" onClick={() => setIsOptionsBoxOpen(!istOptionsBoxOpen)}/>
                        }
                        {istOptionsBoxOpen &&
                            <OptionsBox onEdit={() => setIsCommentEditOpen(true)}/>
                        }
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
                        <div className="comment__likes" onClick={handleLikesListOpen}>
                            <p>{data.length}</p>
                            <ThumbUpIcon/>
                        </div>
                    }
                </div>
            </div>
            {isLikesListOpen &&
                <LikesList object={comment} onClose={handleLikesListOpen}/>
            }
            {isCommentEditOpen &&
                <CommentEdit data={comment} onClose={() => setIsCommentEditOpen(false)}/>
            }
        </div>
    );
}

export default Comment;