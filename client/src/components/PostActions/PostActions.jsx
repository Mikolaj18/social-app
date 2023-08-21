import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt.js";
import CommentIcon from "@mui/icons-material/Comment.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getLikes} from "../../db/likes/getLikes.js";
import {unlike} from "../../db/likes/unlike.js";
import {like} from "../../db/likes/like.js";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import "./postActions.scss";

const PostActions = ({post, handleClick}) => {
    const [isLiking, setIsLiking] = useState(false);
    const {currentUser} = useContext(AuthContext)
    const queryClient = useQueryClient();

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
        <div className="post__actions">
            <div className="post__action" onClick={handleLike}>
                {dataLike && isLiked
                    ? <ThumbUpIcon color={"primary"}/>
                    : <ThumbUpOffAltIcon/>
                }
                <p>I like this</p>
            </div>
            <div className="post__action" onClick={handleClick}>
                <CommentIcon/>
                Comment
            </div>
        </div>
    );
}

export default PostActions;