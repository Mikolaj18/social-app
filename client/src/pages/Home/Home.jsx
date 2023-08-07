import "./Home.scss";
import Posts from "../../components/Posts/Posts.jsx";
import PostForm from "../../components/PostForm/PostForm.jsx";

const Home = () => {
    return (
        <section className="home">
            <div className="home__wrapper">
                <PostForm/>
               <Posts includeFriends={true}/>
            </div>
        </section>
    );
}

export default Home;