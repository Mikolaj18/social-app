import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import "./post.scss";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';

const Post = ({post}) => {
    const {currentUser} = useContext(AuthContext);

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
                            Your browser does not support the video tag.
                        </video>
                    )
                )}
            </div>
            <div className="post__actions">
                <div className="post__action">
                    <ThumbUpOffAltIcon/>
                    0 likes
                </div>
                <div className="post__action">
                    <CommentIcon/>
                    0 comments
                </div>
            </div>
        </div>
    );
}

export default Post;