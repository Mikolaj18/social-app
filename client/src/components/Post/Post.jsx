import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import "./post.scss";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import {useQuery} from "@tanstack/react-query";
import {getPostComments} from "../../db/comments/getPostComments.js";
import Comment from "../Comment/Comment.jsx";
import CommentForm from "../CommentForm/CommentForm.jsx";

const Post = ({post}) => {
    const {currentUser} = useContext(AuthContext);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const {isLoading, error, data} = useQuery({
        queryKey: [`comment-${post._id}`],
        queryFn: () => getPostComments(post._id),
    });

    console.log(data);

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
                    <ThumbUpOffAltIcon/>
                    0 likes
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
                <CommentForm/>
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