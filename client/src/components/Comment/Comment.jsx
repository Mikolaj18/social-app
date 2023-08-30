import moment from "moment/moment.js";
import {Link} from "react-router-dom";
import "./comment.scss"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {unlike} from "../../db/likes/unlike.js";
import {like} from "../../db/likes/like.js";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import LikesList from "../LikesList/LikesList.jsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz.js";
import OptionsBox from "../PostOptions/OptionsBox.jsx";
import CommentEdit from "../CommentEdit/PostEdit.jsx";
import {deleteComment} from "../../db/comments/deleteComment.js";
import {editCommentData} from "../../db/comments/editCommentData.js";
import CommentLike from "../CommentLike/CommentLike.jsx";

const Comment = ({comment}) => {
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();
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

    const editCommentMutation = useMutation({
        mutationFn: async (data) => await editCommentData(data, comment._id),
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        }
    });

    const deleteCommentMutation = useMutation({
        mutationFn: async () => await deleteComment(comment._id),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        }
    });

    const onSubmit = async (values, actions) => {
        try {
            if (!values.description) return;
            const commentDataObject = {...values};
            await editCommentMutation.mutate(commentDataObject);
            setIsOptionsBoxOpen(false);
            setIsCommentEditOpen(false);
        } catch (error) {
            console.log(error)
        }
        actions.setSubmitting(false)
    }

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
                <CommentEdit data={comment} onClose={() => setIsCommentEditOpen(false)} onSubmit={onSubmit}/>
            }
        </div>
    );
}

export default Comment;