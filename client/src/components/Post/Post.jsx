import moment from "moment";
import "./post.scss";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import CommentForm from "../CommentForm/CommentForm.jsx";
import PostActions from "../PostActions/PostActions.jsx";
import PostInteractions from "../PostInteractions/PostInteractions.jsx";
import Comments from "../Comments/Comments.jsx";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Post = ({post}) => {
    const {currentUser} = useContext(AuthContext);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const handleClick = () => {
        setIsCommentsOpen(!isCommentsOpen);
    }

    return (
        <div className="post">
            <div className="post__info">
                <div className="post__data">
                    <Link reloadDocument to={`/profile/${post.author._id}`}>
                        <div className="post__data-img user-profile-rounded">
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
                    <MoreHorizIcon/>
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
           <PostInteractions post={post} handleClick={handleClick}/>
           <PostActions post={post} handleClick={handleClick}/>
            {isCommentsOpen && (
                <div>
                    <CommentForm postId={post._id}/>
                    <Comments post={post}/>
                </div>
            )}
        </div>
    );
}

export default Post;