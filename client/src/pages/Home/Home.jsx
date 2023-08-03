import "./Home.scss";
import {useQuery} from "@tanstack/react-query";
import Posts from "../../components/Posts/Posts.jsx";

const Home = () => {
    return (
        <div className="home">
            <div className="home__wrapper">
               <Posts includeFriends={true}/>
            </div>
        </div>
    );
}

export default Home;