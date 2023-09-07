import moment from "moment/moment.js";
import {Link} from "react-router-dom";
import "./comment.scss"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import LikesList from "../LikesList/LikesList.jsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz.js";
import OptionsBox from "../PostOptions/OptionsBox.jsx";
import CommentEdit from "../CommentEdit/CommentEdit.jsx";
import {deleteComment} from "../../db/comments/deleteComment.js";
import CommentLike from "../CommentLike/CommentLike.jsx";

const Comment = ({comment}) => {
    const {currentUser} = useContext(AuthContext);
    const [isLiking, setIsLiking] = useState(false);
    const [isLikesListOpen, setIsLikesListOpen] = useState(false);
    const [istOptionsBoxOpen, setIsOptionsBoxOpen] = useState(false);
    const [isCommentEditOpen, setIsCommentEditOpen] = useState(false);

    useEffect(() => {
        isLikesListOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLikesListOpen]);

    useEffect(() => {
        isCommentEditOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isCommentEditOpen]);

    const deleteCommentMutation = useMutation({
        mutationFn: async () => await deleteComment(comment._id),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        }
    });

    const onDelete = async () => {
        await deleteCommentMutation.mutate();
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
                            <OptionsBox onEdit={() => setIsCommentEditOpen(true)} onDelete={onDelete}/>
                        }
                    </div>
                </div>
                <div className="comment__bottom">
                    <div className="comment__date">
                        <span>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                    <CommentLike
                        comment={comment}
                        handleLikesListOpen={handleLikesListOpen}
                        isLiking={isLiking}
                        setIsLiking={setIsLiking}
                    />
                </div>
            </div>
            {isLikesListOpen &&
                <LikesList object={comment} onClose={handleLikesListOpen}/>
            }
            {isCommentEditOpen &&
                <CommentEdit
                    comment={comment}
                    setIsCommentEditOpen={setIsCommentEditOpen}
                    setIsOptionsBoxOpen={setIsOptionsBoxOpen}
                />
            }
        </div>
    );
}

export default Comment;