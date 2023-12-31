import moment from "moment";
import "./post.scss";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import CommentForm from "../CommentForm/CommentForm.jsx";
import PostActions from "../PostActions/PostActions.jsx";
import PostInteractions from "../PostInteractions/PostInteractions.jsx";
import Comments from "../Comments/Comments.jsx";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionsBox from "../PostOptions/OptionsBox.jsx";
import PostEdit from "../PostEdit/PostEdit.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deletePost} from "../../db/posts/deletePost.js";

const Post = ({post}) => {
    const {currentUser} = useContext(AuthContext);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isPostOptionsOpen, setIsPostOptionsOpen] = useState(false);
    const [isPostEditOpen, setIsPostEditOpen] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        isPostEditOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPostEditOpen]);

    const handleClick = () => {
        setIsCommentsOpen(!isCommentsOpen);
    }

    const deletePostMutation = useMutation({
        mutationFn: async () => await deletePost(post._id),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        }
    });

    const onDelete = async () => {
        await deletePostMutation.mutate();
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
                    <MoreHorizIcon onClick={() => setIsPostOptionsOpen(!isPostOptionsOpen)}/>
                }
                {isPostOptionsOpen &&
                    <OptionsBox onEdit={() => setIsPostEditOpen(true)} onDelete={onDelete}/>
                }
                {isPostEditOpen &&
                    <PostEdit
                        post={post}
                        setIsPostEditOpen={setIsPostEditOpen}
                        setIsPostOptionsOpen={setIsPostOptionsOpen}

                    />
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