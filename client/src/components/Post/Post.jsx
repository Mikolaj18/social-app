import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import "./post.scss";

const Post = ({post}) => {
    return (
        <div className="post">
            <div className="post__info">
                <div className="post__data">
                    <div className="post__data-img">
                        <img src={post.author.profilePicture ? post.author.profilePicture : "../src/images/default.jpg"} alt="Profile picture"/>
                    </div>
                    <div className="post__data-flex">
                        <div className="post__data-userData">
                            {post.author.name} {post.author.surname}
                        </div>
                        <div className="post__data-date">
                            {moment(post.createdAt).fromNow()}
                        </div>
                    </div>
                </div>
                <CloseIcon/>
            </div>
            <div className="post__content">
                {post.description}
                {post.img && <img src={post.img} alt={""}/>}
            </div>
        </div>
    );
}

export default Post;