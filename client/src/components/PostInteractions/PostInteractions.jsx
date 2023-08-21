import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useQuery} from "@tanstack/react-query";
import {getLikes} from "../../db/likes/getLikes.js";
import "./postInteractions.scss";
import {getPostComments} from "../../db/comments/getPostComments.js";

const PostInteractions = ({post, handleClick}) => {

    const {isLoading, error, data} = useQuery({
        queryKey: [`comment-${post._id}`],
        queryFn: () => getPostComments(post._id),
    });

    const {isLoading: isLoadingLike, error: errorLike, data: dataLike} = useQuery({
        queryKey: [`like-${post._id}`],
        queryFn: () => getLikes(post._id),
    });

    return (
        <div className="post__interactions">
            {typeof dataLike !== "undefined" &&
                <div className="post__interaction">
                    <p>{dataLike.length}</p>
                    <ThumbUpIcon/>
                </div>
            }
            {typeof data !== "undefined" &&
                <div className="post__interaction">
                    <p onClick={handleClick}>{data?.length === 1 ? "1 comment" : `${data?.length} comments`}</p>
                </div>
            }
        </div>
    );
}

export default PostInteractions;