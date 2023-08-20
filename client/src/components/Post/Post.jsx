import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import "./post.scss";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPostComments} from "../../db/comments/getPostComments.js";
import Comment from "../Comment/Comment.jsx";
import CommentForm from "../CommentForm/CommentForm.jsx";
import {getLikes} from "../../db/likes/getLikes.js";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {unlike} from "../../db/likes/unlike.js";
import {like} from "../../db/likes/like.js";

const Post = ({post}) => {
    const {currentUser} = useContext(AuthContext);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery({
        queryKey: [`comment-${post._id}`],
        queryFn: () => getPostComments(post._id),
    });

    const {isLoading: isLoadingLike, error: errorLike, data: dataLike} = useQuery({
        queryKey: [`like-${post._id}`],
        queryFn: () => getLikes(post._id),
    });

    const isLiked = dataLike?.some(data => data.userId === currentUser._id);

    const mutation = useMutation({
        mutationFn: async (objectId) => {isLiked ? await unlike(post._id) : await like(objectId)},
        onSuccess: () => {
            queryClient.invalidateQueries('likes');
        }
    });

    const handleLike = async () => {
        if (!isLiking) {
            setIsLiking(true);
            await mutation.mutateAsync({objectId: post._id});
            setIsLiking(false);
        }
    }

    return (
        <div className="post">
            <div className="post__info">
                <div className="post__data">
                    <Link reloadDocument to={`/profile/${post.author._id}`}>
                        <div className="post__data-img">
                            <img
                                src={post.author.profilePicture ? post.author.profilePicture : "../src/images/default.jpg"}
                                alt="Profile picture"/>
                        </div>
                    </Link>
                    <div className="post__data-flex">
                        <Link reloadDocument to={`/profile/${post.author._id}`}>
                            <div className="post__data-userData">
                                {post.author.name} {post.author.surname}
                            </div>
                        </Link>
                        <div className="post__data-date">
                            {moment(post.createdAt).fromNow()}
                        </div>
                    </div>
                </div>
                {post.author._id === currentUser._id &&
                    <CloseIcon/>
                }
            </div>
            <div className="post__content">
                {post.description}
                {post.file && (
                    post.file.endsWith('.jpg') || post.file.endsWith('.jpeg') || post.file.endsWith('.png') ? (
                        <img src={post.file} alt="" />
                    ) : (
                        <video controls>
                            <source src={post.file} type="video/mp4" />
                        </video>
                    )
                )}
            </div>
            <div className="post__actions">
                <div className="post__action">
                    {dataLike && isLiked
                        ? <ThumbUpIcon color={"primary"} onClick={handleLike}/>
                        : <ThumbUpOffAltIcon onClick={handleLike}/>
                    }
                    {typeof dataLike !== "undefined" &&
                        <p>{dataLike?.length === 1 ? "1 like" : `${dataLike?.length} likes`}</p>
                    }
                </div>
                <div className="post__action" onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
                    <CommentIcon/>
                    {typeof data !== "undefined" &&
                        <p>{data?.length === 1 ? "1 comment" : `${data?.length} comments`}</p>
                    }
                </div>
            </div>
            {isCommentsOpen && (
                <div>
                <CommentForm postId={post._id}/>
                    {isLoading ? "Loading" : error ? "Something went wrong..." :
                        <div className="post__comments">
                            {data.map(comment => (
                                <Comment comment={comment} key={comment._id}/>
                            ))}
                        </div>
                    }
                </div>
            )}
        </div>
    );
}

export default Post;