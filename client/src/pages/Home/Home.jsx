import "./Home.scss";
import {useQuery} from "@tanstack/react-query";
import {getUserPosts} from "../../db/posts/getUserPosts.js";
import {getUserAndFriendsPosts} from "../../db/posts/getUserAndFriendsPosts.js";

const Home = () => {
    const {isLoading, error, data} = useQuery({
        queryKey: ["posts"],
        queryFn: () => getUserAndFriendsPosts(),
    });

    console.log(data);
    return (
        <div className="home">
            <div className="home__wrapper">
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
                <p style={{fontSize: "25px"}}>lorem ipsum</p>
            </div>
        </div>
    );
}

export default Home;