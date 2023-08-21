import "./posts.scss";
import Post from "../Post/Post.jsx";
import { useQuery } from '@tanstack/react-query'
import {getUserPosts} from "../../db/posts/getUserPosts.js";
import Spinner from "../Spinner/Spinner.jsx";

const Posts = ({id, includeFriends}) => {
    const {isLoading, error, data} = useQuery({
        queryKey: [includeFriends ? "homePosts" : "profilePosts"],
        queryFn: () => getUserPosts(id, includeFriends),
    });

    return (
      <div className="posts">
          {isLoading ? <Spinner/> : error ? "Something went wrong":
              data.map(post => (
                  <Post post={post} key={post._id}/>
              ))
          }
      </div>
    );
}

export default Posts;