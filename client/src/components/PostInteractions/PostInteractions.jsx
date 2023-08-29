import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import {useQuery} from "@tanstack/react-query";
import {getLikes} from "../../db/likes/getLikes.js";
import "./postInteractions.scss";
import {getPostComments} from "../../db/comments/getPostComments.js";
import {useEffect, useState} from "react";
import LikesList from "../LikesList/LikesList.jsx";

const PostInteractions = ({post, handleClick}) => {
    const [isLikesListOpen, setIsLikesListOpen] = useState(false);

    useEffect(() => {
        isLikesListOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLikesListOpen]);

    const {isLoading, error, data} = useQuery({
        queryKey: [`comment-${post._id}`],
        queryFn: () => getPostComments(post._id),
    });

    const {isLoading: isLoadingLike, error: errorLike, data: dataLike} = useQuery({
        queryKey: [`like-${post._id}`],
        queryFn: () => getLikes(post._id),
    });

    const handleLikesListOpen = () => {
        setIsLikesListOpen(!isLikesListOpen);
    }

    return (
        <div className="post__interactions">
            {typeof dataLike !== "undefined" && dataLike.length !== 0 &&
                <div className="post__interaction" onClick={handleLikesListOpen}>
                    <p>{dataLike.length}</p>
                    <ThumbUpIcon/>
                </div>
            }
            {typeof data !== "undefined" &&
                <div className="post__interaction post__interaction--comment">
                    <p onClick={handleClick}>{data?.length === 1 ? "1 comment" : `${data?.length} comments`}</p>
                </div>
            }
            {isLikesListOpen &&
                <LikesList object={post} onClose={handleLikesListOpen}/>
            }
        </div>
    );
}

export default PostInteractions;