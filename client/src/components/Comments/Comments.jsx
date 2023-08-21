import Comment from "../Comment/Comment.jsx";
import {useQuery} from "@tanstack/react-query";
import {getPostComments} from "../../db/comments/getPostComments.js";
import "./comments.scss";

const Comments = ({post}) => {
    const {isLoading, error, data} = useQuery({
        queryKey: [`comment-${post._id}`],
        queryFn: () => getPostComments(post._id),
    });

    return (
        <>
            {isLoading ? "Loading" : error ? "Something went wrong..." :
                <div className="comments">
                    {data.map(comment => (
                        <Comment comment={comment} key={comment._id}/>
                    ))}
                </div>
            }
        </>
    );
}

export default Comments;