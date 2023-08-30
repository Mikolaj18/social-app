import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getLikes} from "../../db/likes/getLikes.js";
import {useContext} from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import {AuthContext} from "../../context/authContext.jsx";
import {unlike} from "../../db/likes/unlike.js";
import {like} from "../../db/likes/like.js";
import "./commentLike.scss";

const CommentLike = ({comment, isLiking, setIsLiking, handleLikesListOpen}) => {
    const {currentUser} = useContext(AuthContext);
    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery({
        queryKey: [`like-${comment._id}`],
        queryFn: () => getLikes(comment._id),
    });

    const mutation = useMutation({
        mutationFn: async (objectId) => {isLiked ? await unlike(comment._id) : await like(objectId)},
        onSuccess: () => {
            queryClient.invalidateQueries('likes');
        }
    });
    const handleLike = async () => {
        if (!isLiking) {
            setIsLiking(true);
            await mutation.mutateAsync({objectId: comment._id});
            setIsLiking(false);
        }
    }

    const isLiked = data?.some(data => data.user._id === currentUser._id);
    return (
        <>
            <div className="comment__like" onClick={handleLike}>
                <p style={{color: isLiked ? "#1877f2" : "#65676b"}}>Like</p>
            </div>
            {typeof data !== "undefined" && data.length !== 0 &&
                <div className="comment__likes" onClick={handleLikesListOpen}>
                    <p>{data.length}</p>
                    <ThumbUpIcon/>
                </div>
            }
        </>
    );
}

export default CommentLike;